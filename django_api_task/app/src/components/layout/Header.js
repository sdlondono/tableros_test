import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



export class Header extends Component {


    static propTypes = {
        usuario: PropTypes.object.isRequired,
    };


    render() {
        const { isAuthenticated, user } = this.props.usuario;
        return (

            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand" to="/">
                        Table Manager
                    </Link>

                    {(!localStorage.getItem("nick")) ?

                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Registro
                            </Link>
                            </li>
                        </ul>

                        :

                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/tableros">
                                    Tableros
                                </Link>

                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/crearTablero">
                                    Crear Tablero
                                </Link>

                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/" onClick={() => localStorage.removeItem("nick")}>
                                    Logout
                                </a>

                            </li>
                        </ul>
                    }



                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>

        )
    }
}


const mapStateToProps = state => ({
    usuario: state.usuario
});


export default connect(
    mapStateToProps
)(Header);
