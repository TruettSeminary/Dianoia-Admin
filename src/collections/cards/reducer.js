import { fromJS } from 'immutable'; 

import {
    REFRESH_ALL_CARDS, 
    RESET_CARDS
} from './constants'; 

const initialState = fromJS({});

function getCardMap(cards) {
    return cards.reduce((cardMap, card) => {
        cardMap[card._id] = card; 
        return cardMap; 
    }, {}); 

}

function cardsReducer(state = initialState, action) {
    switch(action.type) {
        case REFRESH_ALL_CARDS: 
            return fromJS(getCardMap(action.cards));
        case RESET_CARDS: 
            return initialState; 
        default: 
            return state; 
    }
}

export default cardsReducer; 