import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk' 

const rootReducer = combineReducers({

    user: useReducer,
    characters: charsReducer

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

getCharactersAction()(store.dispatch, store.getState)