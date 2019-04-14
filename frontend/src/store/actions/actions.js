import * as request from '../../utils/backend';
import * as actionTypes from './actionTypes';


export const fetchTwitchTop = () => (dispatch,getState) => {
    if(getState().twitchTop.length === 0) {
        request.getTwitchTop()
            .then(res => dispatch(updateTwitchTop(res.data.data)))
            .catch();
    }
};

const updateTwitchTop = res => ({
    type: actionTypes.FETCH_TWITCH_TOP,
    twitchTop: res
});
