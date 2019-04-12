const express = require('express');
const router = new express.Router();
const axios = require('axios');

const header = {
    headers : {"Client-ID" : process.env.TWITCH_CLIENT_ID}
}

router.get('/twitch/:name', async (req,res) => {
    const gameURL = 'https://api.twitch.tv/helix/games?name=' + req.params.name;
    
    try {
        const gameResult = await axios.get(gameURL, header);
        
        if(gameResult.data.data.length == 0) {
            return res.status(404).send();
        }

        const streamURL = 'https://api.twitch.tv/helix/streams?game_id=' + gameResult.data.data[0].id;
        const result = await axios.get(streamURL, header);

        if(result.data.data.length === 0) {
            return res.status(404).send();
        }

        res.send(result.data);
    } catch(e) {
        console.log(e);
        res.status(400).send(e);
    }
});


module.exports = router;