import { fork, put, takeLatest } from 'redux-saga/effects'; 

import Dianoia from 'utils/API/index';

import {
    GET_ALL_DECKS
} from './constants'; 

import {
    refreshAllDecks
} from './actions'; 

export function* getAllDecksSaga(action) {
    try {
        const response = yield Dianoia.adminEngine.getAllDecks(); 
        if(Array.isArray(response)) {
            yield put(refreshAllDecks(response)); 
        }
    } catch(error) {

    }
}


export default function* defaultSaga() {
    yield fork(takeLatest, GET_ALL_DECKS, getAllDecksSaga);
}