/* eslint eqeqeq: "off" */
import React, { Component } from 'react';
import "../App.css";
import { Header } from './Header';
/* eslint eqeqeq: "off" */
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StorageManager } from './StorageManager';
import ROUTES from './../routes.js';
import "./authentication/Register.css"
import { Link } from 'react-router-dom'
import { Home } from './Home'

class App extends Component {

    storage = new StorageManager();


    state = {
        isAuthenticated: this.storage.getAuthStatus(),
    }

    getAuthStatus() {
        if (localStorage.getItem("isLoggedIn"))
            return true;
        else
            return false;

    }

    setAuthState(auth, userId) {
        localStorage.setItem("uid", userId);
        localStorage.setItem("isLoggedIn", true);
    }

    render() {
        return (
            <>
                <div className="container-fluid p-0">
                    <Router>
                        <Header isAuthenticated={this.state.isAuthenticated} isAdmin={this.state.isAdmin} setAuthState={(auth, userId) => this.setAuthState(auth, userId)} />
                        <Switch>
                            {ROUTES.map(({ path, component: C, getAuthStatus }, i) => (
                                <Route
                                    key={i}
                                      path={path}
                                    render={(props) => <C {...props} userInfo={{ isAuthenticated: true, currentUserId: 6, userZipCode: 99 }}
                                        setAuthState={(auth, userId, isAdmin) => this.setAuthState(auth, userId, isAdmin)} setZipCode={zip => this.setZipCode(zip)} />} />
                            ))}
                            <Home></Home>
                        </Switch>
                    </Router>
                </div>
            </>
        );
    }
}

export default App;
