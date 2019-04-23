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
                return res.send({'error' : 'Game not found with that name'});
            }
        res.send(response.data);
    } catch(e) {
        console.log(e);
        res.status(400).send();
    }
});

router.get('/igdb/game/id/:id', cache(604800), async (req,res) => {
    try {
        const response = await apicalypse(requestOptions)
            .fields('*,cover.*')
            .where(`slug="${req.params.id}"`)
            .request('/games');

        if(response.data.length === 0) {
            return res.send({'error' : 'Game not found with that id'});
        }
        
        const data = response.data[0];
        updateCache_Games(data.slug,data);
        res.send({[data.slug] : data});
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});

router.get('/igdb/game/slug/:slug', cache(604800), async (req,res) => {
    try {
        const response = await apicalypse(requestOptions)
            .fields('*,cover.*')
            .where(`slug="${req.params.slug}"`)
            .request('/games');

        if(response.data.length === 0) {
            errorMessage = {'error' : 'Game not found with that slug', "slug" : req.params.slug};
            updateCache_Games([req.params.slug],errorMessage);
            return res.send({[req.params.slug] : errorMessage})
        }

        const data = response.data[0];
        updateCache_Games(data.slug,data);
        res.send({[data.slug] : data});
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});

const getCache_Games = () => (mcache.get(gameCacheName));

const updateCache_Games = (name, data) => {
    let games = mcache.get(gameCacheName);
    games = games ? games : {};
    games[name] = data;
    mcache.put(gameCacheName, games);
};

module.exports = router;