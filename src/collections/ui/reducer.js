import { fromJS } from 'immutable'; 

import {
    OPEN_LOGIN_MODAL, 
    CLOSE_LOGIN_MODAL,
    OPEN_SIDE_MENU,
    CLOSE_SIDE_MENU
} from './constants';

const ui = {
    displayLoginModal: false,
    displaySideMenu: false
}; 

const initialState = fromJS(ui); 

function uiReducer(state = initialState, action) {
    switch(action.type) {
        case OPEN_LOGIN_MODAL: 
            return state.set('displayLoginModal', true); 
        case CLOSE_LOGIN_MODAL: 
            return state.set('displayLoginModal', false); 
        case OPEN_SIDE_MENU: 
            return state.set('displaySideMenu', true); 
        case CLOSE_SIDE_MENU: 
            return state.set('displaySideMenu', false); 
        default: 
            return state;
    }
}

export default uiReducer;