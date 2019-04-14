import * as request from '../../utils/backend';
import * as actionTypes from './actionTypes';


export const fetchTwitchTop = () => (dispatch,getState) => {
    if(!getState().twitchTop) {
        request.getTwitchTop()
            .then(res => dispatch(updateTwitchTop(res)))
            .catch();
    }
};

const updateTwitchTop = res => ({
    type: actionTypes.FETCH_TWITCH_TOP,
    twitchTop: res
});
