import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import {connect} from 'react-redux'
import {removeCharsAction, addToFavoritesAction} from '../../redux/charsDuck'

 function Home({chars, removeCharsAction, addToFavoritesAction}) {

    function renderCharacter() {
       let char = chars[0]
        return (
            <Card leftClick={nextCharacter}
                rightClick={addFav} 
                {...char}/>
        )
    }

    function addFav(){
        addToFavoritesAction()
    }

    function nextCharacter(){
        removeCharsAction()
    }
    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}
//FUNCION PARA SACAR LOS DATOS DE REDUX Y COLOCARLOS EN LOS PROPS DE ESTE COMPONENTE
function mapStateToProps(state){
    return{
        chars: state.characters.array
    }
}

//DEVUELVE UNA FUNCION, A LA SEGUNDA LE ENTREGAMOS EL COMP HOME. SE UTILZIA PARA PEDIRLES DATOS O DESPACHAR ACCIONES EJ TRAER PERSONAJES O CAMBIAR PERSONAJE(DESPACHE)
export default connect(mapStateToProps,{removeCharsAction, addToFavoritesAction})(Home); 