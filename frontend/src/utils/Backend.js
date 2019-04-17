import axios from 'axios';

export const getTwitchStreamsByName = (name) => {
    return new Promise (async (resolve,reject) => {
        axios.get('/twitch/game/' + name)
            .then(resolve)
            .catch(reject);
    });
}

export const getTwitchTop = (amount) => {
    return new Promise (async (resolve,reject) => {
        axios.get('/twitch/top/' + amount)
            .then(resolve)
            .catch(reject);
    });
};

export const getIgdbGameBySlug = (slug) => {
    return new Promise (async (resolve,reject) => {
        axios.get('/igdb/game/slug/' + slug)
            .then(resolve)
            .catch(reject);
    });
};

export const getIgdbGames = () => {
    return new Promise (async (resolve,reject) => {
        axios.get('/igdb/games')
            .then(resolve)
            .catch(reject);
    });
};