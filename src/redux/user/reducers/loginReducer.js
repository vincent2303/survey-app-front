import { 
    USER_CHANGE_PASSWORD_ACTION, 
    USER_CHANGE_PSEUDO_ACTION, 
    USER_LOGIN_ACTION,
    USER_SHOW_PASSWORD_ACTION
} from '../actions/userTypes';

const loginReducer = function(state = null, {type, payload}){
    switch (type) {
        case USER_CHANGE_PSEUDO_ACTION:
            return {
                ...state,
                pseudo: payload.pseudo
            }
        case USER_CHANGE_PASSWORD_ACTION:
            return {
                ...state,
                password: payload.password
            }
        case USER_SHOW_PASSWORD_ACTION:
            return {
                ...state,
                showPassword: !state.showPassword
            }
        case USER_LOGIN_ACTION:
            return {
                ...state,
                isConnected: payload.isConnected
            }
        default:
            return state
    }
}

export default loginReducer