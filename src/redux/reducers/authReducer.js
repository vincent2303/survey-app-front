import { CHANGE_PASSWORD_ACTION, CHANGE_PSEUDO_ACTION, LOGIN_ACTION } from '../actions/types';

const authReducer = function(state = null, {type, payload}){
    switch (type) {
        case CHANGE_PASSWORD_ACTION:
            return {
                ...state,
                password: payload.password
            }
        case CHANGE_PSEUDO_ACTION:
            return {
                ...state,
                pseudo: payload.pseudo
            }
        case LOGIN_ACTION:
            return {
                ...state,
                isConnected: payload.isConnected
            }
        default:
            return state
    }
}

export default authReducer