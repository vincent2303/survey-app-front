import axios from 'axios';
import url from 'url';
import jwt from 'jsonwebtoken';
import { GET_USER_SURVEY, READ_URL_TOKEN, SHOW_ERROR, GET_MAIL_INTENSITY, RADIO_BUTTON, COMMENT, SET_ALREADY_ANSWERED } from './userTypes';
import env from '../../../const.js';


let serverUrl = env.serverUrl;


// Cette action récupèr le sondage de l'utilisateur
const getSurvey = (token) => (dispatch) => {
    axios.get(serverUrl+'/user/getSondage', { headers: { Authorization: "bearer " + token } })
    .then( (res) => {
        let answers = makeAnswerMap(res.data);
        let comments = makeCommentMap(res.data);

        dispatch({
            type: GET_USER_SURVEY,
            payload: Object.assign(res.data,
                { 
                loaded: true,
                comments: comments,
                answers: answers,
            })
        });
    })
    .catch( (error) => {
        console.warn("La requête vers le back pour récupérer le sondage utilisateur a échoué :", error.message);
        dispatch({
            type: SHOW_ERROR,
            payload: { 
                error: true,
                errorMessage: "Le serveur a rencontré une erreur au cours du chargement du sondage",
            }
        })
    });
}

export { getSurvey };




const readUrlToken = (urlArg, next = (token) => {}) => (dispatch) => {
    let token;
    try{
    token = url.parse(urlArg, true, true).query.token;
    } catch (error) {
        console.warn("fonction readUrlToken -- impossible de lire l'url passée en argument, erreur ", error.message);
        dispatch({
            type: SHOW_ERROR,
            payload: {
                error: true,
                errorMessage: "Impossible de lire l'url",
            }
        });
    }
    
    // Si il n'y a pas de token, on renvoie simplement une erreur
    if (!token) {
        dispatch({
            type: SHOW_ERROR,
            payload: {
                error: true,
                errorMessage: "Votre Lien est incorrect ! Veuillez utiliser le lien que vous avez reçu par mail !",
            }
        });
    }

    try{
        let decoded = jwt.decode(token);
        dispatch({
            type: READ_URL_TOKEN,
            payload: Object.assign(decoded, {token: token}),
        });
        next(token);
    } catch (error) {
        console.warn("impossible de décrypter le token de l'url, erreur :", error.message);
        dispatch({
            type: SHOW_ERROR,
            payload: {
                error: true,
                errorMessage: "le token de l'url est incorrect ",
            }
        });
    } 
}
export { readUrlToken };

const getMailIntensity = (token, next = () => {} ) => (dispatch) => {
    if (token) {
    axios.get(serverUrl+'/user/getMailIntensity', { headers: { Authorization: "bearer " + token } })
    .then( (res) => {
        dispatch({
            type: GET_MAIL_INTENSITY,
            payload: {
                mailIntensityLoaded: true,
                mailIntensity: res.data.mailIntensity,
            }
        });
        next();
    })
    .catch( (error) => {
        console.warn("erreur au cours de la requère de l'intensité mail, erreur :", error.message);
        dispatch({
            type: GET_MAIL_INTENSITY,
            payload: {
                mailIntensityLoaded: true,
                mailIntensityError: error.message,
            }
        });
    });
    }
}

export { getMailIntensity };

const postMailIntensity = (inputMailIntensity, token, user_id, next = () => {} ) => () => (dispatch) => {
    var body = { newIntensity: inputMailIntensity, user_id: user_id };
    axios.post(serverUrl+'/user/changeFreq', body, {headers:{Authorization: "bearer "+ token}})
    .then( (res) => {
        next(res.data.msg);
    })
    .catch( (error) => {
        console.warn("Impossible de poster la fréquence mail, error :", error.message);
        next("Impossible d'envoyer la fréquence mail au serveur");
    });
}

export { postMailIntensity };


const handleChange  = (params, next = () => {} ) => (dispatch, getState) => (event) => {
    if(params.type) {
        switch (params.type) {
            case 'radioButton':
                dispatch({
                    type: RADIO_BUTTON,
                    payload: {
                        question_id: params.id,
                        answer: params.value,
                    }
                });
                break;


            case 'comment':
                dispatch({
                    type: COMMENT,
                    payload: {
                        thematique_id: params.id,
                        comment: event.target.value
                    }
                });
                break;

            case 'modify':
                dispatch({
                    type: SET_ALREADY_ANSWERED,
                    payload: {
                        value: false,
                    }
                });
                break;

            case 'submit':
                event.preventDefault();
                
                if (allQuestionsAnswered(getState().userSurvey.thematiqueList, getState().userSurvey.answers)) {
                    var surveyBody = arrangeSurveyData(getState().userSurvey);
                    axios.post(serverUrl+'/user/answerSondage', surveyBody, { headers: { Authorization: "bearer "+ getState().userSurvey.token }})
                    .then( (res) => {
                        dispatch({
                            type: SET_ALREADY_ANSWERED,
                            payload: {
                                value: true,
                            }
                        });
                        next(res.data.msg);
                    })
                    .catch( (error) => {
                        console.warn("Impossible de soumettre le sondage au serveur, error : ", error.message);
                        next("Impossible de soumettre le sondage au serveur");
                    });
                }
                
                else {
                    next("Vous devez répondre à toute les questions ! (pas nécessairement les commentaires)");
                }
                
                
                break;

            default:
                console.warn("This event is not handled par the handle change written by Goulven Molaret (TM) :')")
                break;
        }
    }
}

export { handleChange };


/**
 * Cette fontcion met en forme les données de sondage 
 * saisies par l'utilisateur afin de pouvoir envoyer 
 * vers le serveur !
 * 
 * @param {*} userSurvey 
 */
function arrangeSurveyData(userSurvey) {

    // On construit les données sous le format attendus par le serveur
    var answered_questions = [];
    for ( var [question_id, answer] of userSurvey.answers) {
        answered_questions.push({question_id: question_id, answer: answer});
    }

    var answered_commentaires = [];
    for ( var [thematique_id, comment] of userSurvey.comments) {
        // On vérifie que le commentaire n'est pas vide :
        if (comment && comment !== " ") {
            answered_commentaires.push({thematique_id: thematique_id, answer: comment });
        }
    }

    var surveyBody = {
        remplissage_id: userSurvey.remplissage_id,
        sondage_id: userSurvey.sondage_id,
        answered_questions: answered_questions,
        answered_commentaires: answered_commentaires,
    }

    return surveyBody;
}

/**
 * Vérifie que cehque question a bien été répondue
 */

function allQuestionsAnswered(thematiqueList, answers){
    var completed = true;
    
    thematiqueList.forEach( (thematique) => {
        thematique.questionList.forEach( (question) => {
          if(answers.get(question.id) === undefined) {
            completed = false;
          }
        });
      });
      return completed;
}

/**
 * Cette fonction récupère la réponse du serveur
 * et crée le dictionnaire des réponses
 * pour l'affichage
 * 
 * @param {*} data 
 */
function makeAnswerMap(data) {

    // Si le sondage n'a pas déjà été répondu,
    // on crée une nouvelle answer map 
    if (!data.alreadyAnswered) {
        return new Map();
    }

    // On vérifie qu'on a bien la liste des réponses :
    else if (data.reponseList) {

        let answerMap = new Map();
        data.reponseList.forEach( (answer) => {
            answerMap.set(answer.question_id, answer.valeur);
        });

        return answerMap;
    }
    else {
        console.warn("La liste des réponses n'a pas été fournie par le serveur");
        return new Map();
    }
}

/**
 * Cette fonction récupère la réponse du serveur
 * et crée le dictionnaire des commentaires
 * pour l'affichage.
 * Si il n'existe pas de réponse à ce sondage
 * pour cet utilisateur dans la base de donnée,
 * on appelle la fonction create MAP
 * 
 * @param {*} data 
 */
function makeCommentMap(data) {

    // Si le sondage n'a pas déjà été répondu,
    // on crée une map de commentaire avec des champs vides
    if (!data.alreadyAnswered) {
        return initCommentMap(data);
    }

    // On vérifie qu'on a bien la liste des commentaires :
    else if (data.commentaireList) {

        let commentMap = new Map();
        data.commentaireList.forEach( (comment) => {
            commentMap.set(comment.thematique_id, comment.commentaire);
        });

        return commentMap;
    }
    else {
        console.warn("La liste des commentaires n'a pas été fournie par le serveur");
        return initCommentMap(data);
    }
}


/**
 * Cette fonction initialise le dictionnaire
 * des commentaires.
 * Cette initialisation est nécessaire, sinon
 * les zones de commentaires sont "non controlées"
 * 
 * @param {*} data 
 */
function initCommentMap(data) {
    let commentMap = new Map();
    data.thematiqueList.map( (theme) => {
        // Pour chaque thématique, on associe
        // un texte vide comme commentaire
        commentMap.set(theme.id, "");
        return null;
    });
    return commentMap;
}