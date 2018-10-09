import axios from 'axios';

import { GET_SPECIFIC_SURVEY_ACTION } from "./adminTypes";

const handleDateChange = ()=>(dispatch)=> {
    const date = new Date()
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    let fullDate = "";
    if(month.toString().length === 1){
        month = "0" + month;
    } if(day.toString().length === 1){
        day = "0" + day;
    }
    fullDate = year + "-" + month + "-" + day;
    axios.get(`http://localhost:4200/admin/getCommentaireJour/${fullDate}`)
    .then( res => {
        const comments = res.data;
        const loaded = true
        axios.get(`http://localhost:4200/admin/specificStatistics/${year}/${month}/${day}`)
        .then( res => {
            dispatch({
                type: GET_SPECIFIC_SURVEY_ACTION,
                payload: {
                    thematiqueList: res.data.thematiqueList,
                    loaded2: true,
                    comments: comments,
                    loaded: loaded
                }
            })
        });
    });
}

export { handleDateChange }