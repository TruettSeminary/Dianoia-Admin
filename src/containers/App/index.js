// React/Redux
import React from 'react'; 
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom'; 
import PrivateRoute from './PrivateRoute';
import { compose } from 'redux'; // bindActionCreators
import { connect } from 'react-redux';

import {
    appSelector
} from './selectors'; 

// Page Containers
import HomePage from 'containers/HomePage';
import TranslationPage from 'containers/TranslationPage';
import LandingPage from 'containers/LandingPage';
import NotFoundPage from 'containers/NotFoundPage';

// Design
import Toolbar from 'containers/Toolbar';
import Footer from 'components/Footer'; 
import NotificationProvider from 'containers/NotificationProvider'


// Styles
import './styles.css'; 



class App extends React.Component {


    render() {

        return (
            <div className="appContainer">
                <div className="toolbar">
                    <Toolbar />
                </div>
                <div className="content">
                    <Switch>
                        <Route path="/" exact render={() => <LandingPage/>} />

                        <PrivateRoute path="/home" auth={this.props.user.jwt} exact  render={() => <HomePage {...this.props}/>} />
                        <PrivateRoute path="/translation/edit/:translation_id" auth={this.props.user.jwt} exact  render={(props) => {
                            return <TranslationPage translation_id={props.match.params.translation_id}/>
                        }}/>
                        <PrivateRoute path="/translation/create" exact auth={this.props.user.jwt} render={() => <TranslationPage/>} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
                <div className="notifications">
                    <NotificationProvider/>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    router: PropTypes.object.isRequired
};

App.propTypes = {}; 

const mapStateToProps = appSelector(); 

const mapDispatchToProps = (dispatch) =>  {
    return {
        dispatch
    }
};

const withConnect = connect(mapStateToProps, mapDispatchToProps); 

export default compose(
    withConnect,
    withRouter
)(App); 