import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import swal from 'sweetalert';

import { Provider } from 'react-redux';
import store from './redux/store';

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
    switch(error.response.status){
        case 460:
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
        case 461:
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
        case 401:
            swal({
                title: "Session Expired",
                text: "You are not logged in. You will be redirected to the login page.",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                closeOnConfirm: false
            }).then( function(){
                if(window.location.href.includes('admin')){
                    window.location = '/login';
                } if (window.location.href.includes('user')){
                    window.location = '/userlogin';
                }
            });
            return Promise.reject(error);
        default:
            return Promise.reject(error);
    }
}
catch(error) {
}
});

ReactDOM.render(
    <Provider store={store}><App /></Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
