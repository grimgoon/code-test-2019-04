import Axios from 'axios';

export const getTwitchTop = (amount) => {
    return new Promise (async (resolve,reject) => {
        Axios.get('/twitch/top/' + amount)
            .then(resolve)
            .catch(reject);
    });
};

export const getIgdbGameByName = (name) => {
    return new Promise (async (resolve,reject) => {
        Axios.get('/igdb/game/name/' + name)
            .then(resolve)
            .catch(reject);
    });
};