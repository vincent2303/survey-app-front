import { 
    GET_ACCOUNT_ACTION,
    UPDATE_FIRSTNAME_ACTION,
    UPDATE_LASTNAME_ACTION,
    UPDATE_PSEUDO_ACTION,
    UPDATE_EMAIL_ACTION,
    UPDATE_PASSWORD_ACTION,
    UPDATE_USER_PHOTO_ACTION,
} from '../actions/userTypes';

const userAccountReducer = function(state = null, {type, payload}){
    switch (type) {
        case GET_ACCOUNT_ACTION:
            return {
                ...state,
                connectedUser: payload.connectedUser
            }
        case UPDATE_FIRSTNAME_ACTION:
            return {
                ...state,
                connectedUser:{
                    ...state.connectedUser,
                    firstName: payload.firstName,
                }
            }
        case UPDATE_LASTNAME_ACTION:
            return {
                ...state,
                connectedUser:{
                    ...state.connectedUser,
                    lastName: payload.lastName,
                }
            }
        case UPDATE_PSEUDO_ACTION:
            return {
                ...state,
                connectedUser:{
                    ...state.connectedUser,
                    pseudo: payload.pseudo,
                }
            }
        case UPDATE_EMAIL_ACTION:
            return {
                ...state,
                connectedUser:{
                    ...state.connectedUser,
                    email: payload.email,
                }
            }
        case UPDATE_PASSWORD_ACTION:
            return {
                ...state,
                connectedUser:{
                    ...state.connectedUser,
                    password: payload.password,
                }
            }
        case UPDATE_USER_PHOTO_ACTION:
            return {
                ...state,
                connectedUser:{
                    ...state.connectedUser,
                    photo: payload.photo,
                }
            }
        default:
            return state
    }
}

export default userAccountReducer