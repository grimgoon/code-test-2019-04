const express = require('express');
const router = new express.Router();
const apicalypse = require('apicalypse').default;

const cache = require('../utils/mcache');

const url = 'https://api-v3.igdb.com';
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
            
        res.send(response.data);
    } catch(e) {
        res.status(400).send(e.error);
    }
});

router.get('/igdb/game/id/:id', cache(86400), async (req,res) => {
    try {
        const response = await apicalypse(requestOptions)
            .fields('*,cover.*')
            .where('id=' + req.params.id)
            .request('/games');

            if(response.data.length === 0) {
                return res.status(404).send({'error' : 'Game not found with that id'});
            }
            
        res.send(response.data);
    } catch (e) {
        res.status(400).send(e.error);
    }
});

router.get('/igdb/games/name/:name', cache(10), async (req,res) => {
    try {
        const response = await apicalypse(requestOptions)
            .fields('*,cover.*')
            .where('name="' + req.params.name + '"')
            .request('/games');

            console.log(response);

            if(response.data.length === 0) {
                return res.status(404).send({'error' : 'Game not found with that name'})
            }

        res.send(response.data);
    } catch (e) {
        res.status(400).send(e.error);
    }
});

module.exports = router;







