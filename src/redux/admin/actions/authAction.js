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

const checkLogin = () => (dispatch) => {
    axios.get('http://localhost:4200/login/check').then( (res) => {
        console.log(res.data);
        if (res.data){
            dispatch({
                type: LOGIN_ACTION,
                payload: 
                { isConnected: true }
            });
        } else {
            dispatch({
                type: LOGIN_ACTION,
                payload: 
                { isConnected: false }
            });
        }
    });  
}

const login = (pseudo, password)=> (dispatch)=>{
    console.log(password);
    axios({
        url: "http://localhost:4200/login",
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
    axios.get("http://localhost:4200/login/logout").then( () => {
        window.location = '/login';
        dispatch({
            type: LOGOUT_ACTION,
            payload: { }
        })
    });
}

export { changePassword, changePseudo, login, showPassword, changeAdminPage, logout, checkLogin }