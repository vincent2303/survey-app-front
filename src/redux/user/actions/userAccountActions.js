
import axios from 'axios';

import { 
    UPDATE_FIRSTNAME_ACTION,
    UPDATE_LASTNAME_ACTION,
    UPDATE_PSEUDO_ACTION,
    UPDATE_EMAIL_ACTION,
    UPDATE_PASSWORD_ACTION,
    GET_ACCOUNT_ACTION,
    GET_USER_ACTION,
    UPDATE_USER_PHOTO_ACTION,
} from "./userTypes";

export function updateAccount(data) {
    console.log(data.name);
    switch(data.name){
        case "firstName":
        return {
            type: UPDATE_FIRSTNAME_ACTION,
            payload: {
                firstName: data.value
            }
        } 
        case "lastName":
        return {
            type: UPDATE_LASTNAME_ACTION,
            payload: {
                lastName: data.value
            }
        } 
        case "pseudo":
        return {
            type: UPDATE_PSEUDO_ACTION,
            payload: {
                pseudo: data.value
            }
        } 
        case "email":
        return {
            type: UPDATE_EMAIL_ACTION,
            payload: {
                email: data.value
            }
        } 
        case "password":
        return {
            type: UPDATE_PASSWORD_ACTION,
            payload: {
                password: data.value
            }
        } 

    }
}

const updatePhoto = (updatedPhoto) => (dispatch) => {
    console.log(updatedPhoto);
    axios.post('http://localhost:4200/user/updatePhoto', {photo: updatedPhoto})
    .then( res => {
        if(res.status === 200){
            dispatch({
                type: UPDATE_USER_PHOTO_ACTION,
                payload: {
                    photo: res.data.photo
                }
            });
            console.log("updated photo")
        } else {
            console.log("error updating photo");
        }
    })
}
const sendUpdate = (updatedUser) => (dispatch) => {
    axios.post('http://localhost:4200/user/updateUser', {updatedUser: updatedUser})
    .then( res => {
        if(res.status === 200){
            dispatch({
                type: GET_USER_ACTION,
                payload: {
                    connectedUser: res.data
                }
            });
            dispatch({
                type: GET_ACCOUNT_ACTION,
                payload: {
                    connectedUser: res.data
                }
            });
        } else {
            console.log("error updating user");
        }
    })
}

export { updatePhoto, sendUpdate };

