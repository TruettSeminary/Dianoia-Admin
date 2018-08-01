import { dispatch } from 'index.js'; 

import {
    openLoginModal, 
    closeLoginModal
} from 'collections/ui/actions';

const openLogin = () => {
    dispatch(openLoginModal())
}

const closeLogin = () => {
    dispatch(closeLoginModal());
}

const UIManager = {
    openLogin, 
    closeLogin
}

export {
    UIManager
};