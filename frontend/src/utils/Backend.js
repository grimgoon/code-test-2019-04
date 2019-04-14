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
        Axios.get('/igdb/games/name/' + name)
            .then(resolve)
            .catch(reject);
    });
};