const express = require('express');
const router = new express.Router();
const apicalypse = require('apicalypse').default;
const mcache = require('memory-cache');
const cache = require('../utils/mcache');

const url = 'https://api-v3.igdb.com';
const gameCacheName = 'games';
const requestOptions = {
    queryMethod: 'body',
    method: 'POST',
    baseURL: url,
    headers: {
        'user-key' : process.env.IGDB_USER_KEY,
        accept: 'application/json',
    },
    responseType: 'json',
    timeout: 1000,
};

router.get('/igdb/games', async (req,res) => {
    res.send(getCache_Games());
});


router.get('/igdb/search/:name', cache(86400), async (req,res) => {
    try {
        const response = await apicalypse(requestOptions)
            .fields('name')
            .limit(10)
            .search(req.params.name)
            .request('/games');

            if(response.data.length === 0) {
                return res.status(404).send({'error' : 'Game not found with that name'});
            }
            
        res.send(getCache_Games());
    } catch(e) {
        res.status(400).send(e.error);
    }
});

router.get('/igdb/game/id/:id', cache(604800), async (req,res) => {
    try {
        const response = await apicalypse(requestOptions)
            .fields('*,cover.*')
            .where('id=' + req.params.id)
            .request('/games');

            if(response.data.length === 0) {
                return res.status(404).send({'error' : 'Game not found with that id'});
            }
        updateCache_Games(req.params.name,response.data)
        res.send(getCache_Games());
    } catch (e) {
        res.status(400).send(e.error);
    }
});

router.get('/igdb/game/name/:name', cache(604800), async (req,res) => {
    try {
        const response = await apicalypse(requestOptions)
            .fields('*,cover.*')
            .where('name="' + req.params.name + '"')
            .request('/games');

        if(response.data.length === 0) {
            return res.status(404).send({'error' : 'Game not found with that name'})
        }
        updateCache_Games(req.params.name,response.data)
        res.send(getCache_Games());
    } catch (e) {
        console.log(e);
        res.status(400).send(e.error);
    }
});

const getCache_Games = () => {
    console.log(mcache.keys());
    return mcache.get(gameCacheName);
};

const updateCache_Games = (name, data) => {
    let games = mcache.get(gameCacheName);
    games = games ? games : {};
    games[name] = data;
    mcache.put(gameCacheName, games);
};

module.exports = router;







