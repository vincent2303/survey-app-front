import axios from 'axios'
import { UPLOAD_USERLIST_ACTION, POST_USER_ACTION } from "./adminTypes";

function userConstructeur(line){
    return {firstName: line[0], lastName: line[1], email: line[2]}
}
const uploadUserList = (data)=>(dispatch)=>{
    let userList = []
    data.forEach(line => {
        if (line[0]&&line[1]&&line[2]) {
            userList.push(userConstructeur(line))
        }
    });
    dispatch({
        type: UPLOAD_USERLIST_ACTION,
        payload: {userList: userList}
    })
}

const postUser  = (userList)=>(dispatch)=>{
    axios.post("http://localhost:4200/admin/csvPost", {userList: userList}).then(res=>{
        dispatch({
            type: POST_USER_ACTION,
            payload: {
                userList: null,
                csvServerRespons: res.data
            }
        })
    })

}