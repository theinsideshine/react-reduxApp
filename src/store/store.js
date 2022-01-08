import {createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk' //MiddleWare

// Custom reducer

import { authReducers } from '../reducers/authReduces';
import { uiReducer } from '../reducers/uiReduder';


// Configuracion 

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers =combineReducers({
    auth: authReducers,
    ui:   uiReducer
});

export const store = createStore (
    reducers, // Solo recibe un deducer , por eso el uso de combineReducers
    composeEnhancers(
        applyMiddleware(thunk)
    )
);
