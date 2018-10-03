import { combineReducers } from 'redux';
import authReducer from './admin/reducers/authReducer';
import generalStatReducer from './admin/reducers/generalStatReducer';
import specificSurveyReducer from './admin/reducers/specificSurveyReducer';


export default combineReducers({
    auth: authReducer,
    generalStat: generalStatReducer,
    specificSurvey: specificSurveyReducer
})