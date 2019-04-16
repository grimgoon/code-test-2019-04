import * as actionTypes from '../actions/actionTypes';

const initialState = {
    twitchTop: [],
    gameData: {},
    fetchedAllGames : false

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
                fetchedAllGames : action.fetchedAllGames
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