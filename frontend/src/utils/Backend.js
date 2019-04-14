import Axios from 'axios';

export const getTwitchTop = (amount) => {
    return new Promise (async (resolve,reject) => {
        Axios.get('/twitch/top/' + amount)
            .then(resolve)
            .catch(reject);
    });
};