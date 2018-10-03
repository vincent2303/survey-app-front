import { combineReducers } from 'redux';
import authReducer from './admin/reducers/authReducer';

export default combineReducers({
    auth: authReducer,
})