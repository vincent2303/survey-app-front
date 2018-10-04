import { combineReducers } from 'redux';
import authReducer from './admin/reducers/authReducer';
import loginReducer from './user/reducers/loginReducer';
import userMainReducer from './user/reducers/userMainReducer';

export default combineReducers({
    auth: authReducer,
    userAuth: loginReducer ,
    userMain: userMainReducer
})