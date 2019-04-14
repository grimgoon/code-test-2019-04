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

export const fetchGameByName = (name) => (dispatch,getState) => {
    if(!getState().gameData[name]) {
        request.getIgdbGameByName(name)
        .then(res => dispatch(updateGameData(res.data[0])))
        .catch();
    }
};

const updateGameData = res => {
    console.log(res);
    return {
    type: actionTypes.UPDATE_GAME_DATA,
    gameData : {
        [res.name] : {
            ...res
        }
    }
}};