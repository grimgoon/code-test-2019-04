import Axios from 'axios';

export const getTwitchTop = () => {
    return new Promise (async (resolve,reject) => {
        const response = Axios.get('/twitch/top')
            .then(resolve)
            .catch(reject);
        console.log(response);
    });
};