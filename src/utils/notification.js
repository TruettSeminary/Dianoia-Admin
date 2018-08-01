import { dispatch } from 'index.js'; 
import { 
    sendNotification
} from 'containers/NotificationProvider/actions'

const notify = (message, level) => {
    dispatch(sendNotification(message, level)); 
}

export {
    notify
};

