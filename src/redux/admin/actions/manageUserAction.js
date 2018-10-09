import axios from 'axios'
import { 
    UPLOAD_USERLIST_ACTION, 
    POST_USER_ACTION, 
    POST_SINGLE_USER_ACTION,
    POST_ADMIN_ACTION
} from "./adminTypes";

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

const postSingleUser = (user)=>(dispatch)=>{
    axios.post("http://localhost:4200/admin/singlePost", {user: user}).then((res)=>{
        dispatch({
            type: POST_SINGLE_USER_ACTION,
            payload: {
                singleServerRespons: res.data
            }
        })
    })
}

const postAdmin = (pseudo, mp)=>(dispatch)=>{
    axios.post("http://localhost:4200/admin/createAdmin",
    {pseudo: this.state.pseudo, mp: this.state.mp})
    .then(()=>{
        dispatch({
            type: POST_ADMIN_ACTION,
            payload: 'post admin'
        })
    })
}

export { uploadUserList, postSingleUser, postUser, postAdmin }