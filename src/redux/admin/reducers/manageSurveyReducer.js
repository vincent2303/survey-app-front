import { GET_SONDAGE_DATA_ACTION, CHANGE_SONDAGE_SELECTION_ACTION } from '../actions/adminTypes';

const manageSurveyReducer = function(state = null, {type, payload}){
    switch (type) {
        case GET_SONDAGE_DATA_ACTION:
            return {
                ...state,
                sondageList: payload.sondageList,
                currentSondage: payload.currentSondage,
                loaded: payload.loaded,
                selectedSondage: payload.selectedSondage
            }
        case CHANGE_SONDAGE_SELECTION_ACTION:
            return {
                ...state,
                selectedSondage: payload.selectedSondage
            }
        default:
            return state
    }
}

export default manageSurveyReducer