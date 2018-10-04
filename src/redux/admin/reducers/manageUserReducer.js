import { UPLOAD_USERLIST_ACTION } from '../actions/adminTypes';

const manageUserReducer = function(state = null, {type, payload}){
    switch (type) {
        case UPLOAD_USERLIST_ACTION:
            return {
                ...state,
                userList: payload.userList
            }
        default:
            return state
    }
}

export default manageUserReducer