import { 
    TOGGLE_DRAWER_ACTION,
    SWITCH_PAGE_ACTION,
    GET_USER_ACTION,
    UPDATE_FIRSTNAME_ACTION,
    UPDATE_LASTNAME_ACTION,
    UPDATE_PSEUDO_ACTION,
    UPDATE_EMAIL_ACTION,
    UPDATE_PASSWORD_ACTION,
} from '../actions/userTypes';

const userMainReducer = function(state = null, {type, payload}){
    switch (type) {
        case TOGGLE_DRAWER_ACTION:
            return {
                ...state,
                toggleDrawer: payload.toggleDrawer
            }
        case SWITCH_PAGE_ACTION:
            return {
                ...state,
                selectedPage: payload.page
            }
        case GET_USER_ACTION:
            return {
                ...state,
                connectedUser: payload.connectedUser
            }
        
        default:
            return state
    }
}

export default userMainReducer