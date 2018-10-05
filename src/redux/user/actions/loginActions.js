import axios from 'axios';

import { 
    USER_LOGIN_ACTION, 
    USER_CHANGE_PASSWORD_ACTION, 
    USER_CHANGE_PSEUDO_ACTION,
    USER_SHOW_PASSWORD_ACTION,
    REDIRECT_TO_LOGIN_ACTION
} from "./userTypes";

export function updatePseudo(newPseudo) {
    return {
        type: USER_CHANGE_PSEUDO_ACTION,
        payload: {
            pseudo: newPseudo
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
    axios.post('http://localhost:4200/admin/login',{pseudo: user.pseudo, password: user.password})
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