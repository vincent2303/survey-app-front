import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import swal from 'sweetalert';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
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
                text: "Your session has expired. Would you like to be redirected to the login page?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                closeOnConfirm: false
            }).then( function(){
                window.location = '/login';
            });
            return Promise.reject(error);
        default:
            console.log("no problem");
            return Promise.reject(error);
    }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
