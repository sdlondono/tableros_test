import { GET_TABLERO, TABLERO_SUCCESS, TABLERO_FAIL } from '../actions/types.js';

const initialState = {
    tablero: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TABLERO:
            return {
                ...state,
                tablero: action.payload
            }
        case TABLERO_SUCCESS:
            return {
                ...state,
                ...action.payload,
                alert: false,
            };

        case TABLERO_FAIL:
            return {
                ...state,
                alert: true,
                flag: false,
                message: "Error al crear el tablero!",
            };

        default:
            return state;
    }
}