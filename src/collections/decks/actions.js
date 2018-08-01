import {
    GET_ALL_DECKS,
    REFRESH_ALL_DECKS,
    RESET_DECKS
} from './constants';

export function getAllDecks() {
    return {
        type: GET_ALL_DECKS
    }
}


export function refreshAllDecks(decks) {
    return {
        type: REFRESH_ALL_DECKS, 
        data: {
            decks
        }
    }
}

export function resetDecks() {
    return {
        type: RESET_DECKS
    }
}