/* eslint-disable */
import { Provider } from 'react-redux'; 
import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { ConnectedRouter } from "connected-react-router";
import createHistory from 'history/createBrowserHistory'; 

import { PersistGate } from 'redux-persist/integration/react'; 

import 'sanitize.css/sanitize.css'; 
import 'whatwg-fetch'; 
import 'assets/scss/material-kit-react.css'; 
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from 'containers/App'; 
import Loading from 'components/Loading'; 

import configureStore from './store'; 


import {
    getAllDecks
} from 'collections/decks/actions'; 

import {
    getAllCards
} from 'collections/cards/actions'; 

import {
    getAllTranslations
} from 'collections/translations/actions'; 

import {
    updateJWT
} from 'collections/user/actions'; 


// Create redux store with history
const basename = "/"
const history = createHistory({
  basename
});

const { store, persistor} = configureStore(history); 

/* eslint-enable */

const onBeforeLift = () => { 
    const state = store.getState();   
    if(state.user) {
        const jwt = state.user.toJS().jwt; 
        store.dispatch(updateJWT(jwt)); 
        
        // Refresh Data
        if(jwt) {
            store.dispatch(getAllDecks()); 
            store.dispatch(getAllCards()); 
            store.dispatch(getAllTranslations()); 
        }
    } 
}

ReactDOM.render(
    (<Provider store={store}>
        <PersistGate loading={<Loading />} 
            persistor={persistor}
            onBeforeLift={onBeforeLift}
            >
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </PersistGate>
    </Provider>), 
    document.getElementById('root')
);




registerServiceWorker();

const dispatch = store.dispatch; 
export {
    dispatch
};