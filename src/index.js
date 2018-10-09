import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import swal from 'sweetalert';

import { Provider } from 'react-redux';
import { store } from './redux/store';

axios.interceptors.request.use(function (config) {
    config.withCredentials = true;
    return config;
}, function(err) {
    return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    
    try{
        console.log(error.response.data.message);
    switch(error.response.data.message){
        case "Wrong username":
            swal({
                title: "Wrong username",
                text: "The username you entered does not exist",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                closeOnConfirm: false
            })
            return Promise.reject(error);
        case "Wrong password":
            swal({
                title: "Wrong password",
                text: "The password you entered is not correct",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                closeOnConfirm: false
            })
            return Promise.reject(error);
        case "Not logged in":
            console.log(error.response.data.message);
            swal({
                title: "Session Expired",
                text: "You are not logged in. You will be redirected to the login page.",
                type: "warning",
                buttons: true,
            }).then( () => {
                window.location = '/login';
            });
            return Promise.reject(error);
        case "Not authorized":
            swal({
                title: "Unauthorized",
                text: "You do not have authorization. You can be redirected to the user page or the login page.",
                type: "warning",
                buttons: {
                    login: {
                        text:'Login',
                        value: 'login',
                    },
                    user: {
                        text:'User page',
                        value: 'user',
                    },
                }
            }).then( value => {
                switch(value){
                    case 'login':
                        window.location = '/login';
                        break;
                    case 'user':
                        window.location = '/user';
                        break;
                    default:
                        window.location = '/login';
                }
            });
            return Promise.reject(error);
        default:
            return Promise.reject(error);
    }
}
catch(error) {
    console.log(error);
}
});

ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
