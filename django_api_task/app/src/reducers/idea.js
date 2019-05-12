import { GET_IDEA, IDEA_SUCCESS, IDEA_FAIL } from '../actions/types.js';

const initialState = {
    idea: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_IDEA:
            return {
                ...state,
                idea: action.payload
            }
        case IDEA_SUCCESS:
            return {
                ...state,
                ...action.payload,
                alert: false,
            };

        case IDEA_FAIL:
            return {
                ...state,
                alert: true,
                flag: false,
                message: "Error al crear la idea!",
            };

        default:
            return state;
    }
}