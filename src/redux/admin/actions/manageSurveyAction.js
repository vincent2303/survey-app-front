import axios from 'axios';

import { 
    GET_SONDAGE_DATA_ACTION,
    CHANGE_SONDAGE_SELECTION_ACTION ,
    POST_SURVEY_ACTION
} from "./adminTypes";

const getSondageData = ()=>(dispatch)=> {
    axios.get("http://localhost:4200/admin/getSondage")
    .then( res => {
        const sondage_list = res.data
        let currentSondage = sondage_list[0]
        sondage_list.forEach((sondage) => {
            if(sondage.current){
                currentSondage = sondage
            }
        });
        dispatch({
            type: GET_SONDAGE_DATA_ACTION,
            payload: {
                sondageList: sondage_list,
                loaded: true,
                currentSondage: currentSondage,
                selectedSondage: currentSondage,
            }
        })
    });
}

const changeSondageSelection = (sondage)=>(dispatch)=>{
    dispatch({
        type: CHANGE_SONDAGE_SELECTION_ACTION,
        payload: {selectedSondage: sondage}
    })
}


export { getSondageData, changeSondageSelection }