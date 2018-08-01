import { fromJS } from 'immutable';

import {
    REFRESH_USER,
    RESET_USER
} from './constants';

// TODO: figure out how to hydrate user and current state from cache

const user = {
    _id: '', 
    email: '', 
    first_name: '', 
    last_name: '',
    settings: {},
    jwt: ''
}

const initialState = fromJS(user); 


function userReducer(state = initialState, action) {
    switch(action.type) {
        case REFRESH_USER: 
            return state.mergeDeep(action.user); 
        case RESET_USER: 
            return initialState; 
        default: 
            return state; 
      }
}

export default userReducer; 