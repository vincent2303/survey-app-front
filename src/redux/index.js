import { combineReducers } from 'redux';
import authReducer from './admin/reducers/authReducer';
import loginReducer from './user/reducers/loginReducer';
import userMainReducer from './user/reducers/userMainReducer';
import generalStatReducer from './admin/reducers/generalStatReducer';
import specificSurveyReducer from './admin/reducers/specificSurveyReducer';
import manageSurveyReducer from './admin/reducers/manageSurveyReducer';
import manageUserReducer from './admin/reducers/manageUserReducer';

export default combineReducers({
    auth: authReducer,
    generalStat: generalStatReducer,
    specificSurvey: specificSurveyReducer,
    manageSurvey: manageSurveyReducer,
    userAuth: loginReducer ,
    userMain: userMainReducer,
    manageUser: manageUserReducer
})