import { fork, put, takeLatest } from 'redux-saga/effects'; 

import Dianoia from 'utils/API/index'; 

import {
    GET_ALL_TRANSLATIONS, 
    CREATE_TRANSLATION, 
    UPDATE_TRANSLATION, 
    DELETE_TRANSLATION
} from './constants'; 

import {
    refreshAllTranslations,
    createTranslationSucceeded, 
    updateTranslationSucceeded, 
    deleteTranslationSucceeded
} from './actions';



export function* getAllTranslationsSaga(action) {
    try {
        const translations = yield Dianoia.adminEngine.getAllTranslations(); 
        yield put(refreshAllTranslations(translations)); 
    } catch(error) {
        console.error(error); 
    }

}

export function* createTranslationSaga(action) {
    try {
        const translation = yield Dianoia.adminEngine.createTranslation(action.translation); 
        yield put(createTranslationSucceeded(translation)); 
    } catch(error) {
        console.error(error); 
    }
}

export function* updateTranslationSaga(action) {
    try {
        const translation = yield Dianoia.adminEngine.updateTranslation(action.translation); 
        yield put(updateTranslationSucceeded(translation)); 
    } catch(error) {
        console.error(error); 
    }
}

export function* deleteTranslationSaga(action) {
    try {
        const translation = yield Dianoia.adminEngine.deleteTranslation(action.translation); 
        yield put(deleteTranslationSucceeded(translation)); 
    } catch(error) {
        console.error(error); 
    }
}

export default function* defaultSaga() {
    yield fork(takeLatest, GET_ALL_TRANSLATIONS, getAllTranslationsSaga); 
    yield fork(takeLatest, CREATE_TRANSLATION, createTranslationSaga); 
    yield fork(takeLatest, UPDATE_TRANSLATION, updateTranslationSaga); 
    yield fork(takeLatest, DELETE_TRANSLATION, deleteTranslationSaga); 
}