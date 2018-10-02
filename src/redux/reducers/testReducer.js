import { TEST_ACTION } from '../actions/types';

const testReducer = function(state = null, {type, payload}){
    switch (type) {
        case TEST_ACTION:
            return {
                ...state,
                test: payload
            }
        default:
            return state
    }
}

export default articleReducer