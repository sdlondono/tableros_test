import axios from 'axios';


import { GET_USUARIO, CREATE_USUARIO, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// GET USUARIO
export const getUsuario = () => dispatch => {
    axios.get('/api/usuario/')
        .then(res => {
            dispatch({
                type: GET_USUARIO,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// LOGIN USUARIO
export const login = (nick, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    const body = JSON.stringify({ nick, password });

    axios.post("/api/login/", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            console.log(res.data)
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data
            });
        });
};

// REGISTER USER
export const register = ({ nombre, apellido, nick, password, num_iden, foto }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    const body = JSON.stringify({ nombre, apellido, nick, password, num_iden, foto });

    axios
        .post("/api/usuario/", body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data
            });
        });
};