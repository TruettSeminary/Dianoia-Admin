import { createStore, applyMiddleware } from 'redux'; 
import { connectRouter, routerMiddleware } from 'connected-react-router';  
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import localforage from 'localforage'; 
import immutableTransform from 'redux-persist-transform-immutable';

import createSagaMiddleware from 'redux-saga'; 
import createReducer from './reducers'; 
import { sagas } from './sagas'; 

const sagaMiddleware = createSagaMiddleware(); 

// TODO: determine which level of merging needs to take place
const persistConfig = {
  key: 'dianoia-admin', 
  storage: localforage,
  blacklist: ['router', 'notificationProvider'],
  transforms: [immutableTransform({
    blacklist: ['router']
  })]
}

export default function configureStore(history) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
      sagaMiddleware, 
      routerMiddleware(history)
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // Set up compose with Redux Devtools
  const composeEnhancers = composeWithDevTools({
    name: 'Dianoia'
  });  

  const routerRootReducer = connectRouter(history)(createReducer());

  const persistedReducer = persistReducer(persistConfig, routerRootReducer); 

  let store = createStore(
    persistedReducer,
    composeEnhancers(...enhancers)
  );

  let persistor = persistStore(store); 

  // Start each saga
  sagas.forEach((saga) => {
    sagaMiddleware.run(saga); 
  }); 

  return {store, persistor}; 

}