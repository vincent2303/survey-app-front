import { GET_SONDAGE_DATA_ACTION } from '../actions/adminTypes';

const manageSurveyReducer = function(state = null, {type, payload}){
    switch (type) {
        case GET_SONDAGE_DATA_ACTION:
            return {
                ...state,
                sondageList: payload.sondageList,
                currentSondage: payload.currentSondage,
                loaded: payload.loaded,
            }
        default:
            return state
    }
}

export default manageSurveyReducer