import axios from 'axios';

import { 
    TOGGLE_DRAWER_ACTION,
    SWITCH_PAGE_ACTION,
    REDIRECT_TO_LOGIN_ACTION,
    GET_USER_ACTION,
    USER_LOGIN_ACTION,
} from "./userTypes";

export function toggleDrawer(open) {
    return {
        type: TOGGLE_DRAWER_ACTION,
        payload: {
            toggleDrawer: open
        }
    }
}

export function redirectLogin(redirect) {
    return {
        type: REDIRECT_TO_LOGIN_ACTION,
        payload: {
            redirect: redirect
        }
    }
}

export function switchPage(page) {
    return {
        type: SWITCH_PAGE_ACTION,
        payload: {
            page: page
        }
    }
}

const getUser = () => (dispatch) => {
    axios.get('http://localhost:4200/user/getUser')
    .then((res) => {
        console.log(res.data);
        if (res.status === 200){
            dispatch({
                type: GET_USER_ACTION,
                payload: {
                    connectedUser: res.data
                }
            })
            dispatch({
                type: USER_LOGIN_ACTION,
                payload: {
                    isConnected: true
                }
            })
        } else {
            dispatch({
                type: REDIRECT_TO_LOGIN_ACTION,
                payload: {
                    redirect: true
                }
            })
        }
        
    });
}

const logout = () => (dispatch) => {
    axios.get('http://localhost:4200/user/logout')
    .then((res =>{
        dispatch({
            type: USER_LOGIN_ACTION,
            payload: {
                isConnected: false
            }
        })
        dispatch({
            type: GET_USER_ACTION,
            payload: {
                connectedUser: null
            }
        })
    }))
}
export { getUser, logout }