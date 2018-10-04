import { 
    TOGGLE_DRAWER_ACTION
} from '../actions/userTypes';

const userMainReducer = function(state = null, {type, payload}){
    switch (type) {
        case TOGGLE_DRAWER_ACTION:
            return {
                ...state,
                toggleDrawer: payload.toggleDrawer
            }
        default:
            return state
    }
}

export default userMainReducer