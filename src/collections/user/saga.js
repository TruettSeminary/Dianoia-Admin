// TODO: remove redudancy in sagas

import { fork, call, put, takeLatest } from 'redux-saga/effects'; 

// Utils
import Dianoia from 'utils/API/index'; 

// App "Connections" 
import { push } from 'connected-react-router'; 

// Constants
import {
    SUBMIT_LOGIN,
    LOGIN_SUBMIT_SUCCESS, 
    LOGIN_SUBMIT_FAIL, 
    LOGOUT,
    UPDATE_JWT
} from './constants'; 

// Actions
import { notify } from 'utils/notification'; 
import { closeLoginModal } from 'collections/ui/actions'; 

import {
    updateJWT,
    loginSucceeded, 
    loginFailed, 
    refreshUser,
    resetUser,
} from './actions'; 

import { getAllDecks, resetDecks } from 'collections/decks/actions'; 
import { getAllCards, resetCards } from 'collections/cards/actions'; 
import { getAllTranslations, resetTranslations } from 'collections/translations/actions'; 

export function* updateJWTSaga(action) {
    try {
        yield Dianoia.setJWT(action.jwt);
    } catch(error) {

    }
}

export function* submitLoginSaga(action) {
    try {
        const response = yield Dianoia.loginUser(action.data.email, action.data.password); 
        
        if(response.jwt) {
            // Valid login
            
            yield put(updateJWT(response.jwt));

            // TODO: add a "remember me" porition to saving the authentication 
            yield put(loginSucceeded({
                ...response.user, 
                jwt: response.jwt
            })); 
        }
    } catch(error) {
        yield put(loginFailed(error)); 
    }
}


export function* loginSucceededSaga(action) {
    
    // update API JWT
    yield put(refreshUser(action.user)); 

    // update location and UI
    yield put(push('/home'));
    yield put(closeLoginModal());  

    // Get all page data that requires authentication
    yield put(getAllDecks()); 
    yield put(getAllCards());
    yield put(getAllTranslations()); 
}

export function* loginFailedSaga(action) {
    // TODO:  check which message should be sent based on action
    yield call(notify, action.error.response.payload.message, 'danger'); 
}

export function* logoutSaga(action) {
    try {
        // TODO: clean this up
        yield put(updateJWT('')); 
        yield put(resetUser()); 
        yield put(resetDecks());
        yield put(resetCards());
        yield put(resetTranslations()); 
    } catch(error) {
        
    }
}


export default function* defaultSaga() {
    yield fork(takeLatest, UPDATE_JWT, updateJWTSaga); 

    yield fork(takeLatest, SUBMIT_LOGIN, submitLoginSaga);
    yield fork(takeLatest, LOGIN_SUBMIT_SUCCESS, loginSucceededSaga);
    yield fork(takeLatest, LOGIN_SUBMIT_FAIL, loginFailedSaga); 
    yield fork(takeLatest, LOGOUT, logoutSaga);
}