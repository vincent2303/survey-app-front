import { combineReducers } from 'redux';
import authReducer from './admin/reducers/authReducer';
import userMainReducer from './user/reducers/userMainReducer';
import generalStatReducer from './admin/reducers/generalStatReducer';
import specificSurveyReducer from './admin/reducers/specificSurveyReducer';
import manageSurveyReducer from './admin/reducers/manageSurveyReducer';
import userSurveyReducer from './user/reducers/userSurveyReducer';
import manageUserReducer from './admin/reducers/manageUserReducer';

import { initialState } from './store'

const appReducer = combineReducers({
    auth: authReducer,
    generalStat: generalStatReducer,
    specificSurvey: specificSurveyReducer,
    manageSurvey: manageSurveyReducer,
    userMain: userMainReducer,
    userSurvey: userSurveyReducer,
    manageUser: manageUserReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_ACTION') {
        state = initialState
      }
    return appReducer(state, action);
};

export default rootReducer;
