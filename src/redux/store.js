import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk' 
import charsReducer, {getCharactersAction} from './charsDuck'
import userReducer from './userDuck'
const rootReducer = combineReducers({

    user: userReducer,
    characters: charsReducer

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    )


    getCharactersAction()(store.dispatch, store.getState)
    return store
}