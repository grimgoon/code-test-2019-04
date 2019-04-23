const express = require('express');
const path = require('path');
require('dotenv').config();

const twitchRouter = require('./routers/twitch');
const igdbRouter = require('./routers/igdb'); 

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(twitchRouter);
app.use(igdbRouter);

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});

