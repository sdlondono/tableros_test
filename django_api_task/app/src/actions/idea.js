import axios from 'axios';

import { GET_IDEA, IDEA_SUCCESS, IDEA_FAIL } from './types';


// GET Idea
export const getIdea = (idIdea) => dispatch => {

    let id = localStorage.getItem("id");
    axios.get(`/api/idea/${id}/${idIdea}`)
        .then(res => {
            dispatch({
                type: GET_IDEA,
                payload: res.data
            });
        }).catch(err => console.log("Into here"));
}

// // CREATE Tablero
// export const createTablero = ({ nombre, state, usuario_fk }) => dispatch => {
//     // Headers
//     const config = {
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };

//     const body = JSON.stringify({ nombre, state, usuario_fk });

//     axios.post(`/api/tablero/`, body, config)
//         .then(res => {
//             dispatch({
//                 type: TABLERO_SUCCESS,
//                 payload: res.data
//             });
//         }).catch(err => dispatch({
//             type: TABLERO_FAIL,
//             payload: err.response.data
//         }));
// }