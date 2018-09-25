import axios from 'axios';

const queryingData = function (state, changeState) {

    let serverUrl = state.serverUrl;
    let token = state.token;
    
    // Tentative de récupérer le sondage depuis le serveur
    try {
        axios.get(serverUrl+"/user/getSondage", {headers:{Authorization: "bearer "+ token}})
            .then( res => {
                changeState(res.data, () => {
                    // Si le sondage n'a pas déjà été répondu, le chargement
                    // est terminé !
                    if(!res.data.alreadyAnswered){
                        changeState({loaded: true});
                    }
                });
                
                // Dans le cas où le sondage a déjà été remplis, on complète les réponses dans l'état :
                if (res.data.alreadyAnswered){
                    
                    // Récupération des réponses
                    var answers = new Map();
                    res.data.reponseList.forEach( (answer) => {
                        answers.set(answer.question_id, answer.valeur);
                    });

                    // Récupération des commentaires
                    var comments = new Map();
                    res.data.commentaireList.forEach( (comment) => {
                        comments.set(comment.thematique_id, comment.commentaire);
                    });

                    // On applique ces modifications au composant survey
                    changeState({answers: answers, comments: comments}, () => {
                        changeState({loaded: true});
                    });
                }
            })
    } catch (error) {
        console.log("catched an error");
        // Si une erreur a été attrapée, on passe l'état erreur a vrai 
        changeState({ errorMessage: "Impossible de récupérer le sondage actuel :(  \n erreur : "+error.message, error: true, });
    }
} 

export default queryingData;