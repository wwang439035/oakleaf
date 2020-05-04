/*
import {applyMiddleware, createStore, compose} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import freeze from 'redux-freeze'
import _ from 'lodash'
 */
import {createStore} from 'redux'
import rootReducer from './rootReducer'

let storeInitialized = false;
let store = null;

if (!storeInitialized) {
    storeInitialized = true;
    /*const logger = createLogger();
    const middlewares = _.compact([thunk, freeze, logger]);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    */
    store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        //composeEnhancers(applyMiddleware(...middlewares))
    );
}

export default store;