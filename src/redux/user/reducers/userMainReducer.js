import { 
    TOGGLE_DRAWER_ACTION,
    SWITCH_PAGE_ACTION,
    REDIRECT_TO_LOGIN_ACTION,
    GET_USER_ACTION,
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
        case REDIRECT_TO_LOGIN_ACTION:
            return {
                ...state,
                redirectToLogin: payload.redirect
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