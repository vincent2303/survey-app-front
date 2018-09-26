import axios from 'axios';

const postSurvey = function(state, changeState) {
    let serverUrl = state.serverUrl;
    let token = state.token

    // On construit les données sous le format attendus par le serveur
    var answered_questions = [];
    for ( var [question_id, answer] of state.answers) {
        answered_questions.push({question_id: question_id, answer: answer});
    }

    var answered_commentaires = [];
    for ( var [thematique_id, answer] of state.comments) {
        // On vérifie que le commentaire n'est pas vide :
        if (answer && answer !== " ") {
            answered_commentaires.push({thematique_id: thematique_id, answer: answer });
        }
    }

    var sondage = {
        remplissage_id: state.remplissage_id,
        sondage_id: state.sondage_id,
        answered_questions: answered_questions,
        answered_commentaires: answered_commentaires,
    }
    console.log("sondage :");
    console.log(sondage);
    try {
        axios.post(serverUrl+'/user/answerSondage', sondage, 
        {headers:{Authorization: "bearer "+token}})
        .then( (res) => {
            if(res.status && res.status === 200){
                changeState({alreadyAnswered: true});
                alert(res.data.msg);
            }
            else {
                alert("Il y a une erreur au cours de l'enregistrement du sondage sur le server");
            }
        })
    }
    catch (error) {
        alert("Il y a une erreur au cours de l'enregistrement du sondage sur le server");
    }
}

export default postSurvey;