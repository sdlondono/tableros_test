import axios from 'axios';

import { GET_TABLERO, TABLERO_SUCCESS, TABLERO_FAIL } from './types';


// GET TABLERO
export const getTablero = () => dispatch => {

    let id = localStorage.getItem("id");
    axios.get(`/api/tableusuario/${id}`)
        .then(res => {
            dispatch({
                type: GET_TABLERO,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// CREATE TABLERO
export const createTablero = ({ nombre, state, usuario_fk }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ nombre, state, usuario_fk });

    axios.post(`/api/tablero/`, body, config)
        .then(res => {
            dispatch({
                type: TABLERO_SUCCESS,
                payload: res.data
            });
        }).catch(err => dispatch({
            type: TABLERO_FAIL,
            payload: err.response.data
        }));
}