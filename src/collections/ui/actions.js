import {
    OPEN_LOGIN_MODAL,
    CLOSE_LOGIN_MODAL,
    OPEN_SIDE_MENU,
    CLOSE_SIDE_MENU
} from './constants';

export function openLoginModal() {
    return {
        type: OPEN_LOGIN_MODAL
    }
}

export function closeLoginModal() {
    return {
        type: CLOSE_LOGIN_MODAL
    }
}

export function openSideMenu() {
    return {
        type: OPEN_SIDE_MENU
    }
}

export function closeSideMenu() {
    return {
        type: CLOSE_SIDE_MENU
    }
}