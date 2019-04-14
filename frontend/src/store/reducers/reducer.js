import * as actionTypes from '../actions/actionTypes';

const initialState = {
    twitchTop: [],

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_TWITCH_TOP :
        return {
            ...state,
            twitchTop : action.twitchTop
        }
        default : 
            return {
                ...state
            }
    }
}

export default reducer;