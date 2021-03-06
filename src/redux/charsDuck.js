import axios from 'axios'
import{updateDB, getFavs} from '../firebase'

const initialData = {

    fetching: false,
    array: [],
    current: {},
    favorites: []
}

const url = `https://rickandmortyapi.com/api/character`

const UPDATE_PAGE ="UPDATE_PAGE"
const GET_CHARACTERS = "GET_CHARACTERS"
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"
const REMOVE_CHARACTER = "REMOVE_CHARACTER"
const ADD_TO_FAVORITES = "ADD_TO_FAVORITES"
const GET_FAVS= "GET_FAV"
const GET_FAVS_SUCCESS = "GET_FAV_SUCCESS"
const GET_FAVS_ERROR ="GET_FAV_ERROR"


//reducer 

export default function reducer(state = initialData, action){
    switch (action.type){
        case GET_CHARACTERS:
            return{...state, fetching: true}
        case GET_CHARACTERS_SUCCESS:
            return{...state, fetching: false, array: action.payload}
        case GET_CHARACTERS_ERROR:
            return{...state, fetching:false, error: action.payload}
        case REMOVE_CHARACTER:
            return {...state, array: action.payload}
        case ADD_TO_FAVORITES:
            return {...state, ... action.payload}
        case GET_FAVS:
            return {...state, fetching: true}
        case GET_FAVS_SUCCESS:
            return{...state, fetching: false, favorites: action.payload}
        case GET_FAVS_ERROR:
            return{...state, fetching: false, error: action.payload}
            default:
                return state
    }

}

function saveStorage(key, storage){
    storage = JSON.stringify(storage)
    localStorage.setItem(key, storage)
}

export const getCharactersAction = () => (dispatch, gestate) => {

    dispatch({
        type: GET_CHARACTERS
    })
    return axios.get(url)
        .then(res => {
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload: res.data.results
            })
        })
        .catch(e  => {
            dispatch({
                type: GET_FAVS_ERROR,
                payload:  e.response.error
            })
        })

}

export const removeCharsAction = () => (dispatch, getState) => {

    const {array} = getState().characters
    array.shift()
    if(!array.length){

        getCharactersAction()(dispatch, getState)
        return
    }
    dispatch({
        type: REMOVE_CHARACTER,
        payload: [...array]
    })
}


export const addToFavoritesAction = () => (dispatch, getState) => {

    const {array, favorites} = getState().characters
    const {uid} = getState().user
    const char = array.shift()
    favorites.push(char)
    updateDB(favorites, uid)
    dispatch({
        type: ADD_TO_FAVORITES,
        payload: {array: [...array], favorites:[...favorites]}
    })
    saveStorage('favs', favorites)
}


export const recoverFavsAction = () => (dispatch, getState) => {
    dispatch({
        type: GET_FAVS
    })

    const {uid} = getState().user
    return getFavs(uid)
        .then(favs => {
            dispatch({
                type: GET_FAVS_SUCCESS,
                payload: [...favs]
            })
            saveStorage('favs',[...favs])  
        })
        .catch(e => {
            dispatch({
                type: GET_FAVS_ERROR,
                payload: e.message
            })
        })
}

export const restoreFavsAction = () => (dispatch, getState) => {

    let favs = localStorage.getItem('favs');
    favs = JSON.parse(favs);
    if(favs && favs.length > 0){
        dispatch({
            type: GET_FAVS_SUCCESS,
            payload:favs
        })
    }

}