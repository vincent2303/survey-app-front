import { GET_USER_SURVEY, READ_URL_TOKEN, SHOW_ERROR, GET_MAIL_INTENSITY, RADIO_BUTTON, COMMENT, SET_ALREADY_ANSWERED } from '../actions/userTypes'

const userSurveyReducer = function(state = null, {type, payload}) {
    switch (type) {
        case GET_USER_SURVEY:
            return (
                Object.assign({}, state, payload) 
                );
        case SHOW_ERROR:
                return {
                    ...state,
                    error: payload.error,
                    errorMessage: payload.errorMessage,
                }
        
        case READ_URL_TOKEN:
                return (
                    Object.assign({}, state, payload)
                );
        
        case GET_MAIL_INTENSITY:
                return (
                    Object.assign({}, state, payload)
                );

        case RADIO_BUTTON:
                var newAnswers = new Map(state.answers);
                newAnswers.set(payload.question_id, payload.answer);
                return { 
                    ...state,
                    answers: newAnswers
                }
        
        case COMMENT:
                var newComments = new Map(state.comments);
                newComments.set(payload.thematique_id, payload.comment);
                return ({
                    ...state,
                    comments: newComments
                });

        case SET_ALREADY_ANSWERED:
                return(
                    Object.assign({}, state, { alreadyAnswered: payload.value })
                );

        default:
            return state;
    }
};

export default userSurveyReducer;