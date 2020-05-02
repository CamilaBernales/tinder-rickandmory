import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk' 
import charsReducer, {getCharactersAction, restoreFavsAction} from './charsDuck'
import userReducer,{restoreSessionAction} from './userDuck'
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

    restoreSessionAction()(store.dispatch)
    restoreFavsAction()(store.dispatch);
    getCharactersAction()(store.dispatch, store.getState)
    return store
}