import { createSelector } from 'reselect'; 

const selectNotificationProviderDomain = () => (state) => {
    return state.notificationProvider;
};


const makeSelectNotificationProvider = () => createSelector(
    selectNotificationProviderDomain(), 
    (substate) => {
        return substate.toJS(); 
    }
);

export default makeSelectNotificationProvider;