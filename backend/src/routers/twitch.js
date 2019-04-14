const express = require('express');
const router = new express.Router();
const axios = require('axios');

const url = 'https://api.twitch.tv/helix';
const config = {
    headers : {"Client-ID" : process.env.TWITCH_CLIENT_ID}
};

router.get('/twitch/:name', async (req,res) => {
    try {
        const gameURL = url + '/games?name=' + req.params.name;
        const gameResponse = await axios.get(gameURL, config);
        if(gameResponse.data.data.length === 0 ) {
            return res.status(404).send({"error" : "Game not found with that name"})
        }

        const streamsURL = url + '/streams?game_id=' + gameResponse.data.data[0].id;
        const streamsResponse = await axios.get(streamsURL, config);
        if(streamsResponse.data.data.length === 0 ) {
            return res.status(404).send({"error" : "Streams not found with that game name"})
        }

        res.send(streamsResponse.data); 
    } catch(e) {
        res.status(400).send(e.error);
    }
});

module.exports = router;