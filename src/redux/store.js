/*
import {createLogger} from 'redux-logger'
import freeze from 'redux-freeze'
 */
import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import _ from 'lodash'

let storeInitialized = false;
let store = null;

if (!storeInitialized) {
    storeInitialized = true;
    const middlewares = _.compact([thunk]);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /*const logger = createLogger();
    const middlewares = _.compact([thunk, freeze, logger]);
    */
    store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middlewares))
    );
}

export default store;