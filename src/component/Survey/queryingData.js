import axios from 'axios';

const queryingData = function (state, changeState) {

    let serverUrl = "http://localhost:4200";
    let token = state.token;
    
    // Try to request the survey to the server
    try {
        axios.get(serverUrl+"/user/getSondage", {headers:{Authorization: "bearer "+ token}})
            .then( res => {
                changeState(res.data, () => { console.log("response server registered !"); changeState({loaded: true});});
                console.log(res);
            })
    } catch (error) {
        console.log("catched an error");
        // Si une erreur a été attrapée, on passe l'état erreur a vrai 
        changeState({ errorMessage: "Impossible de récupérer le sondage actuel :(  \n erreur : "+error.message, error: true, });
    }
} 

export default queryingData;