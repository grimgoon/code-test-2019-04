const express = require('express');
const router = new express.Router();
const axios = require('axios');
const cache = require('../utils/mcache');

const url = 'https://api.twitch.tv/helix';
const config = {
    headers : {"Client-ID" : process.env.TWITCH_CLIENT_ID}
};

router.get('/twitch/game/:name', cache(1800), async (req,res) => {
    try {
        const gameUrl = url + '/games?name=' + req.params.name;
        const gameResponse = await axios.get(gameUrl, config);
        if(gameResponse.data.data.length === 0 ) {
            return res.send({"error" : "Game not found with that name"})
        }

        const streamsUrl = url + '/streams?game_id=' + gameResponse.data.data[0].id;
        const streamsResponse = await axios.get(streamsUrl, config);
        if(streamsResponse.data.data.length === 0 ) {
            return res.send({"error" : "Streams not found with that game name"})
        }

        res.send(streamsResponse.data.data); 
    } catch(e) {
        res.status(400).send(e.error);
    }
});

router.get('/twitch/top/:amount', cache(1800), async (req,res) => {
    try {
        const gameUrl = url + '/games/top?first=' + req.params.amount;
        const response = await axios.get(gameUrl, config);

        res.send(response.data); 
    } catch(e) {
        res.status(400).send(e.error);
    }
});

module.exports = router;