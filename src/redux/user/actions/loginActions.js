import axios from 'axios';

import { 
    LOGIN_ACTION, 
    CHANGE_PASSWORD_ACTION, 
    CHANGE_PSEUDO_ACTION,
    SHOW_PASSWORD_ACTION
} from "./userTypes";

export function updatePseudo(newPseudo) {
    return {
        type: CHANGE_PSEUDO_ACTION,
        payload: {
            pseudo: newPseudo
        }
    }
}

export function updatePass(newPass) {
    return {
        type: CHANGE_PASSWORD_ACTION,
        payload: {
            password: newPass
        }
    }
}

export function showPassword(){
    return {
        type: SHOW_PASSWORD_ACTION,
    }
}

const login = (user) => (dispatch) => {
    axios.post('http://localhost:4200/admin/login',{pseudo: user.pseudo, password: user.password})
    .then((res) => {
        console.log(res);
        dispatch({
            type: LOGIN_ACTION,
            payload: {
                isConnected: true
            }
        });
    });
}
export {login}