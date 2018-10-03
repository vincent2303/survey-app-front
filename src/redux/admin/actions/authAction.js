import axios from 'axios';

import { 
    LOGIN_ACTION, 
    CHANGE_PASSWORD_ACTION, 
    CHANGE_PSEUDO_ACTION,
    SHOW_PASSWORD_ACTION,
    CHANGE_DASHBOARD_PAGE_ACTION,
    LOGOUT_ACTION
} from "./adminTypes";


const changePseudo = (event)=>(dispatch)=>{
    dispatch({
        type: CHANGE_PSEUDO_ACTION,
        payload: {
            pseudo: event.target.value
        }
    })
}

const changePassword = (event)=>(dispatch)=>{
    dispatch({
        type: CHANGE_PASSWORD_ACTION,
        payload: {
            password: event.target.value
        }
    })
}

const login = (pseudo, password)=> (dispatch)=>{
    axios({
        url: "http://localhost:4200/admin/login",
        data: {pseudo: pseudo, password: password},
        method: 'post',
        withCredentials: true
    })
    .then(res=>{
        if(res.status === 200){
            dispatch({
                type: LOGIN_ACTION,
                payload: 
                { isConnected: true }
            });
        }
    })
}

const showPassword = (previousBooleanShowPassword)=>(dispatch)=>{
    dispatch({
        type: SHOW_PASSWORD_ACTION,
        payload: {booleanShowPassword: !previousBooleanShowPassword}
    })
}

const changeAdminPage = (pageNumber)=>(dispatch)=>{
    dispatch({
        type: CHANGE_DASHBOARD_PAGE_ACTION,
        payload: { onPage: pageNumber}
    })
}

const logout = ()=>(dispatch)=>{
    dispatch({
        type: LOGOUT_ACTION,
        payload: {  }
    })
}

export { changePassword, changePseudo, login, showPassword, changeAdminPage, logout }