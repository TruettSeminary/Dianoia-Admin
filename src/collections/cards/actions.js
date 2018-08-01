import {
    GET_ALL_CARDS,
    REFRESH_ALL_CARDS,
    RESET_CARDS
} from './constants'; 

export function getAllCards() {
    return {
        type: GET_ALL_CARDS
    }
}

export function refreshAllCards(cards) {
    return {
        type: REFRESH_ALL_CARDS, 
        cards
    }
}

export function resetCards() {
    return {
        type: RESET_CARDS
    }
}