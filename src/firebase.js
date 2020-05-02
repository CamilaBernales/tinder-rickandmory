import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


const firebaseConfig = {

    apiKey: "AIzaSyA53f6tqNpmB5fDExU4b76wXGsr-JtjMFM",
    authDomain: "practica-redux-a36dd.firebaseapp.com",
    databaseURL: "https://practica-redux-a36dd.firebaseio.com",
    projectId: "practica-redux-a36dd",
    storageBucket: "practica-redux-a36dd.appspot.com",
    messagingSenderId: "423120106006",
    appId: "1:423120106006:web:30683d27cf3fa67667bb37",
    measurementId: "G-3SGKGF4M3R"

};


//inicializar firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore().collection('favs')

export function loginWithGoogle(){

    const provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
    .then(snap => snap.user)
}


export function getFavs(uid){
    return db.doc(uid).get()
    .then(snap =>{
        return snap.data().array
    })
}

export function updateDB(array, uid){
    return db.doc(uid).set({array})
}

export function signOutGoogle(){
    firebase.auth().signOut();
}