import {loginWithGoogle, signOutGoogle} from '../firebase'
import {recoverFavsAction} from './charsDuck'

const initialData = {
    loggedIn : false,
    fetching: false
}


const LOGIN = "LOGIN"
const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const LOGIN_ERROR = "LOGIN_ERROR"
const LOG_OUT = "LOG_OUT"


export default function reducer( state = initialData, action){
    switch(action.type){
        case LOG_OUT:
            return {...initialData}
        case LOGIN:
            return{...state, fetching: true}
        case LOGIN_ERROR:
            return{...state, fetching:false}
        case LOGIN_SUCCESS:
            return{ ...state, fetching: false, ...action.payload, loggedIn: true}
        default:
            return state
    }
}
function saveStore(storage){
    localStorage.storage = JSON.stringify(storage)
}

export const  doGoogleLoginAction = () => (dispatch, getState) => {
    dispatch({
        type: LOGIN
    })
    return loginWithGoogle()
    .then(user => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload:{
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            }
        })
        saveStore(getState())
        recoverFavsAction()(dispatch, getState)
    })
    .catch(e => {
        dispatch({
            type: LOGIN_ERROR,
            payload: e.message
        })
    })

}

export const restoreSessionAction = () => dispatch => {

    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    if(storage && storage.user){
        dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user
        })
    }
}

export const logOutAction = () => (dispatch, getState) => {

    signOutGoogle()
    dispatch({
        type: LOG_OUT
    })
    localStorage.removeItem('storage');
    localStorage.removeItem('favs');
}