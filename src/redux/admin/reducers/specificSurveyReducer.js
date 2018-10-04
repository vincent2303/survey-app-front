import { GET_SPECIFIC_SURVEY_ACTION } from '../actions/adminTypes';

const specificSurveyReducer = function(state = null, {type, payload}){
    switch (type) {
        case GET_SPECIFIC_SURVEY_ACTION:
            return {
                ...state,
                thematiqueList: payload.thematiqueList,
                loaded2: payload.loaded2,
                comments: payload.comments,
                loaded: payload.loaded
            }
        default:
            return state
    }
}

export default specificSurveyReducer