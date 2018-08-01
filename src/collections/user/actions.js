import {
    UPDATE_JWT,
    SUBMIT_LOGIN,
    LOGIN_SUBMIT_FAIL,
    LOGIN_SUBMIT_SUCCESS, 
    LOGOUT,
    REFRESH_USER,
    RESET_USER
} from './constants';

export function updateJWT(jwt) {
    return {
        type: UPDATE_JWT, 
        jwt
    }
}

export function submitLogin(email, password) {
    return {
        type: SUBMIT_LOGIN, 
        data: {
            email, 
            password
        }
    }
}

export function loginSucceeded(user) {
    return {
        type: LOGIN_SUBMIT_SUCCESS,
        user
    }
}

export function loginFailed(error) {
    return {
        type: LOGIN_SUBMIT_FAIL, 
        error
    }
}


export function logout() {
    return {
        type: LOGOUT
    }
}

export function resetUser() {
    return {
        type: RESET_USER
    }
}

export function refreshUser(user) {
    return {
        type: REFRESH_USER, 
        user
    }
}