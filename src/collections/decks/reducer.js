import { fromJS } from 'immutable';

import {
    REFRESH_ALL_DECKS, RESET_DECKS
} from './constants';

const initialState = fromJS({}); 

// expects an array of decks
// returns an object with keys (of the deck id) mapped to a deck
const getDeckMap = (decks) => {
    return decks.reduce((deckMap, deck) => {
        deckMap[deck._id] = deck; 
        return deckMap; 
    }, {});
}

function decksReducer(state = initialState, action) {
    switch(action.type) {
        case REFRESH_ALL_DECKS:
            return fromJS(getDeckMap(action.data.decks)); 
        case RESET_DECKS: 
            return initialState; 
        default:
            return state; 
    }
}

export default decksReducer;