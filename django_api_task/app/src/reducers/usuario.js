import { GET_USUARIO, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types.js';

const initialState = {
    usuario: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USUARIO:
            return {
                ...state,
                usuario: action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:

            // console.log(action.payload);
            localStorage.setItem("nick", action.payload.nick);
            localStorage.setItem("id", action.payload.id);
            return {
                ...state,
                ...action.payload,
                alert: false,
                isAuthenticated: true,
            };
        case LOGIN_FAIL:
            localStorage.removeItem("nick", action.payload.nick);
            localStorage.setItem("id", action.payload.id);
            return {
                ...state,
                alert: true,
                flag: false,
                message: "Error credenciales no validas!",
                isAuthenticated: false,
            };
        case REGISTER_FAIL:
            localStorage.removeItem("nick");
            return {
                ...state,
                alert: true,
                flag: false,
                message: "Error usuario ya existente!",
                isAuthenticated: false,
            };
        default:
            return state;
    }
}