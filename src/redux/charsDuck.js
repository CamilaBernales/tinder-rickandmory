import axios from 'axios'

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

export const  getCharactersAction = () => (dispatch, gestate) => {

    dispatch({

    })

}