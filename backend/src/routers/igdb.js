const express = require('express');
const router = new express.Router();
const apicalypse = require('apicalypse').default;

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

router.get('/igdb/search/:name', async (req,res) => {
    try {
        const response = await apicalypse(requestOptions)
            .fields('name')
            .limit(10)
            .search(req.params.name)
            .request('/games');

            if(response.data.length === 0) {
                return res.status(404).send({"error" : "Game not found with that name"})
            }
            
        res.send(response.data);
    } catch(e) {
        res.status(400).send(e.error);
    }
});

router.get('/igdb/game/:id', async (req,res) => {
    try {
        const response = await apicalypse(requestOptions)
            .fields('*')
            .where("id=" + req.params.id)
            .request('/games');

            if(response.data.length === 0) {
                return res.status(404).send({"error" : "Game not found with that name"})
            }
            
        res.send(response.data);
    } catch (e) {
        res.status(400).send(e.error);
    }
});

module.exports = router;







