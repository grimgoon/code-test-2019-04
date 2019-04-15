import * as request from '../../utils/Backend';
import * as actionTypes from './actionTypes';

// TWITCH

export const fetchTwitchTop = (amount) => (dispatch,getState) => {
    if(getState().twitchTop.length === 0) {
        request.getTwitchTop(amount)
            .then(res => dispatch(updateTwitchTop(res.data.data)))
            .catch();
    }
};

const updateTwitchTop = res => {
    console.log(res);
    return {
    type: actionTypes.FETCH_TWITCH_TOP,
    twitchTop: res
}};


// IGDB

export const fetchGameByName = (name) => (dispatch,getState) => {
    if(!getState().gameData[name]) {
        request.getIgdbGameByName(name)
        .then(res => dispatch(updateGameData(res.data[0])))
        .catch();
    }
};

const updateGameData = res => {
    return {
    type: actionTypes.UPDATE_GAME_DATA,
    gameData : {
        [res.name] : {
            ...res
        }
    }
}};