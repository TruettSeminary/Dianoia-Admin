// react/redux
import React from 'react'; 

import { compose } from 'redux'; 
import { connect } from 'react-redux'; 

// React/Redux config
import {
    closeNotification
} from './actions'; 

import makeSelectNotificationProvider from './selectors'; 

// Design
import Notification from './Notification'; 
import Clearfix from 'md-components/Clearfix/Clearfix';

class NotificationProvider extends React.Component {

    generateNotifications() {
        const notifications = this.props.notifications.map((notification) => {
            return (<Notification 
                id={notification.id}
                key={notification.id}
                message={notification.message}
                level={notification.level}
                close={this.props.closeNotification}
            />); 
        });

        return notifications;
    }

    render() {
        return (
            <div>
                {this.generateNotifications()}
                <Clearfix />
            </div>
        );
    }
}

const mapStateToProps = makeSelectNotificationProvider();

const mapDispatchToProps = (dispatch) => {
    return {
        closeNotification: (notification_id) => {
            dispatch(closeNotification(notification_id))
        }, 
        dispatch
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect
)(NotificationProvider); 