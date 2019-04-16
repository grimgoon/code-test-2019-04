import * as actionTypes from '../actions/actionTypes';

const initialState = {
    twitchTop: [],
    gameData: {},
    fetchedCachedGames : false

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_GAME_DATA :
            return {
                ...state,
                gameData: {
                    ...state.gameData,
                    ...action.gameData
                },
                fetchedCachedGames : action.fetchedCachedGames
            }
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