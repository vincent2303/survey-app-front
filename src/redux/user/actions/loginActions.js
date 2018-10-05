import axios from 'axios';

import { 
    USER_LOGIN_ACTION, 
    USER_CHANGE_PASSWORD_ACTION, 
    USER_CHANGE_EMAIL_ACTION,
    USER_SHOW_PASSWORD_ACTION,
    REDIRECT_TO_LOGIN_ACTION
} from "./userTypes";

export function updateEmail(newEmail) {
    return {
        type: USER_CHANGE_EMAIL_ACTION,
        payload: {
            email: newEmail
        }
    }
}

export function updatePass(newPass) {
    return {
        type: USER_CHANGE_PASSWORD_ACTION,
        payload: {
            password: newPass
        }
    }
}

export function showPassword(){
    return {
        type: USER_SHOW_PASSWORD_ACTION,
    }
}

const login = (user) => (dispatch) => {
    axios.post('http://localhost:4200/userPage/login',{email: user.email, password: user.password})
    .then((res) => {
        console.log(res);
        dispatch({
            type: REDIRECT_TO_LOGIN_ACTION,
            payload: {
                redirect: false
            }
        })
        dispatch({
            type: USER_LOGIN_ACTION,
            payload: {
                isConnected: true
            }
        });
    });
}
export {login}