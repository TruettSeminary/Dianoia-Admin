import {
    SEND_NOTIFICATION, 
    CLOSE_NOTIFICATION
} from './constants'; 

export function sendNotification(message, level) {
    return {
        type: SEND_NOTIFICATION, 
        data: {
            message, 
            level
        }
    }
}

export function closeNotification(notification_id) {
    return {
        type: CLOSE_NOTIFICATION, 
        data: {
            notification_id
        }
    }
}