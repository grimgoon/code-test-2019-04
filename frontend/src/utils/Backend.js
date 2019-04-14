import Axios from 'axios';

export const getTwitchTop = () => {
    return new Promise (async (resolve,reject) => {
        Axios.get('/twitch/top')
            .then(resolve)
            .catch(reject);
    });
};