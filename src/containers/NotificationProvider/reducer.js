import { fromJS } from 'immutable'; 
import uuid from 'uuid/v4'; 

import {
    SEND_NOTIFICATION, 
    CLOSE_NOTIFICATION
} from './constants';

const initialState = fromJS({
    notifications: []
}); 

function notificationProviderReducer(state = initialState, action) {
    switch(action.type) {
        case SEND_NOTIFICATION:
            return state.set('notifications', state.get('notifications').push({
                id: uuid(), 
                message: action.data.message, 
                level: action.data.level
            }));
        case CLOSE_NOTIFICATION: 
            return state.set('notifications', state.get('notifications')
            .filter((notification) => {
                return notification.id !== action.data.notification_id; 
            }));
        default: 
            return state; 
    }
}

export default notificationProviderReducer; 