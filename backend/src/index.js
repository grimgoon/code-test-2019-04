const express = require('express');
require('dotenv').config();

const twitchRouter = require('./routers/twitch');
const igdbRouter = require('./routers/igdb'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(twitchRouter);
app.use(igdbRouter);

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});

