import { combineReducers } from 'redux';

import usuario from './usuario';
import tablero from './tablero';
import idea from './idea';

export default combineReducers({
    idea,
    usuario,
    tablero
});