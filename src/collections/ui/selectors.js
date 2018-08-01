import { createSelector } from 'reselect'; 

const getUI = () => (state) => state.ui.toJS(); 

const loginUI = createSelector(
    getUI(), 
    (ui) => {
        return {
            displayLoginModal: ui.displayLoginModal
        }
    }
)

const sideMenuUI = createSelector(
    getUI(), 
    (ui) => {
        return {
            displaySideMenu: ui.displaySideMenu
        }
    }
)

export {
    loginUI,
    sideMenuUI
}; 