import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './components/home/Home'
import Favs from './components/favs/Favs'
import LoginPage from './components/login/Login'

function Routes({ loggedIn }) {
    return (
        <Switch>
        <Route path="/login" component={LoginPage} />
            {loggedIn ?
                <Route path="/favs" component={Favs} />
                :
                <Redirect to="/login" />
            }

            {loggedIn ?
                <Route exact path="/" component={Home} /> 
                :
                <Redirect to="/login" />
            }
        </Switch>
    )
}

function mapState({ user: { loggedIn } }) {
    return {
        loggedIn
    }
}

export default connect(mapState)(Routes)