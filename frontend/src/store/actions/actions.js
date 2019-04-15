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
        .then(res => dispatch(updateGameData(res.data, true)))
        .catch();
    }
};

export const fetchGameByName = (name) => (dispatch,getState) => {
    if(!getState().gameData[name]) {
        request.getIgdbGameByName(name)
        .then(res => dispatch(updateGameData(res.data)))
        .catch();
    }
};


const updateGameData = (res, fetchedAllGames = false) => {
    return {
    type: actionTypes.UPDATE_GAME_DATA,
    gameData : res,
    fetchedAllGames 
}};


