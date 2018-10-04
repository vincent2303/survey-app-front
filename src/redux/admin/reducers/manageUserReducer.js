import { 
    UPLOAD_USERLIST_ACTION, 
    POST_USER_ACTION, 
    POST_SINGLE_USER_ACTION,
    POST_ADMIN_ACTION
} from '../actions/adminTypes';

const manageUserReducer = function(state = null, {type, payload}){
    switch (type) {
        case UPLOAD_USERLIST_ACTION:
            return {
                ...state,
                userList: payload.userList
            }
        case POST_USER_ACTION:
            return {
                ...state,
                userList: payload.userList,
                csvServerRespons: payload.csvServerRespons
            }
        case POST_SINGLE_USER_ACTION:
            return {
                ...state,
                singleServerRespons: payload.singleServerRespons
            }
        case POST_ADMIN_ACTION:
            return state
        default:
            return state
    }
}

export default manageUserReducer