import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header';

import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Login, Registro, Inicio } from './usuario/index';
import { Tableros, CrearTablero } from './tablero/index';

import 'babel-core/register';
import 'babel-polyfill';


class App extends Component {


    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header context={this} />
                        <div className="container">

                            <Switch>
                                <Route exact path="/" component={Inicio} />
                                <Route path="/login" component={(props) => <Login {...props} context={this} />} />
                                <Route path="/register" component={Registro} />
                                <Route path="/tableros" component={Tableros} />
                                <Route path="/crearTablero" component={CrearTablero} />
                            </Switch>

                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }

}

ReactDOM.render(<App />, document.getElementById('app'));