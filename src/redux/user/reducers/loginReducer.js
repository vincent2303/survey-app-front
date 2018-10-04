import { 
    CHANGE_PASSWORD_ACTION, 
    CHANGE_PSEUDO_ACTION, 
    LOGIN_ACTION,
    SHOW_PASSWORD_ACTION
} from '../actions/userTypes';

const loginReducer = function(state = null, {type, payload}){
    switch (type) {
        case CHANGE_PSEUDO_ACTION:
            return {
                ...state,
                pseudo: payload.pseudo
            }
        case CHANGE_PASSWORD_ACTION:
            return {
                ...state,
                password: payload.password
            }
        case SHOW_PASSWORD_ACTION:
            return {
                ...state,
                showPassword: !state.showPassword
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

export default loginReducer