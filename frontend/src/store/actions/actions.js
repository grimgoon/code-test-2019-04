import * as request from '../../utils/backend';
import * as actionTypes from './actionTypes';

// TWITCH

export const fetchTwitchTop = (amount) => (dispatch,getState) => {
    if(getState().twitchTop.length === 0) {
        request.getTwitchTop(amount)
            .then(res => dispatch(updateTwitchTop(res.data.data)))
            .catch();
    }
};

const updateTwitchTop = res => ({
    type: actionTypes.FETCH_TWITCH_TOP,
    twitchTop: res
});


// IGDB
export const fetchGames = () => (dispatch,getState) => {
    if(Object.entries(getState().gameData).length === 0 && getState().gameData.constructor === Object) {
        request.getIgdbGames()
        .then(res => dispatch(updateFetchedGames(res.data, true)))
        .catch();
    }
};

export const fetchGameBySlug = (slug) => (dispatch,getState) => {
    if(!getState().gameData[slug]) {
        request.getIgdbGameBySlug(slug)
        .then(res => dispatch(updateGameData(res.data)))
        .catch();
    }
};

const updateGameData = (res) =>({
    type: actionTypes.UPDATE_GAME_DATA,
    gameData : res,
});

const updateFetchedGames  = (res,fetchedCachedGames) =>({
    type: actionTypes.UPDATE_CACHED_DATA,
    gameData : res,
    fetchedCachedGames
});




