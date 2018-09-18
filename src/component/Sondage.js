import axios from 'axios'
import ErrorIcon from '@material-ui/icons/Error';
import { Snackbar } from '@material-ui/core';
import ErrorBanner from './ErrorBanner';

var React = require('react');
const jwt = require('jsonwebtoken');

class Sondage extends React.Component {
  constructor(props) {
    
    super(props);
    var answerMap = new Map()
    this.state = {
      value: '',
      id: '',
      firstName: '',
      lastName: '',
      user_id:'',
      sondage_id: '',
      remplissage_id:'',
      alreadyAnswered: false,
      questions: [],
      loaded: false,
      token: '',
      errorMessage: '',
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  
    console.log("starting to read the url :");

    // Verifie si l'url contient un token ou non
    if (props.location.search === ''){
      console.log("no token !");
      this.state = { errorMessage: " No token provided, you have to use the link from the email !", error: true, };
    }else {

    try {
    let token = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape("token").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    let decoded = jwt.verify(token, "mon secret");
    console.log("Decoded informations");    
    console.log(decoded);
    
    
        this.state = {
          id: decoded.remplissage_id,
          firstName: decoded.firstName, 
          lastName: decoded.lastName, 
          remplissage_id: decoded.remplissage_id,
          user_id:decoded.user_id, 
          sondage_id: decoded.sondage_id,
          token: token,
          answered_questions: new Map(),
        };
    axios.get('http://localhost:4200/user/getSondage',{headers:{Authorization: "bearer "+ token}})
      .then(res => {
        if(!res.data.alreadyAnswered){
          console.log("you didn't already answered", res.data.questionList[0].id)
          this.setState(() => ({
            questions: res.data.questionList,
            alreadyAnswered: res.data.alreadyAnswered,
            loaded: true
          }));

        } else {
          console.log("you already answered")
          this.setState(() => ({
            questions: res.data.questionList,
            reponses: res.data.reponseList,
            alreadyAnswered: res.data.alreadyAnswered,
            loaded: true,
          }), () => {
            console.log(this.state.reponses);
            var answered_questions = this.state.answered_questions;
            this.state.reponses.forEach(reponse => {
              answered_questions.set(reponse.question_id, reponse.valeur);
            });
            this.setState({answered_questions: answered_questions});
          });

          
          
        }
      });
    }
    catch(error) {
      console.log("catched an error :");
      this.state = { errorMessage: "Couldn't retrieve survey  \n error : "+error.message, error: true, };
    }
   }
  }

  handleChange(event) {
    const question_id = event.target.name;
    const answer = event.target.value;
    var answered_questions = this.state.answered_questions;
    answered_questions.set(question_id, answer);
    
    /*
    console.log("question id :");
    console.log(question_id);
    console.log("answer :")
    console.log(answer);
    console.log(this.state.answered_questions);*/
  }
  
  handleSubmit(event) {
    console.log("submitting form");
    var answered_questionsMap = this.state.answered_questions;
    var answered_questions = [];
    for (var [question_id, answer] of answered_questionsMap) {
        answered_questions.push({question_id: question_id, answer: answer});
    }
    
    var sondage = { 
      remplissage_id: this.state.remplissage_id,
      sondage_id : this.state.sondage_id,
      answered_questions: answered_questions,
    };
    console.log(sondage);
    axios.post('http://localhost:4200/user/answerSondage',sondage,
    {headers:{Authorization: "bearer "+ this.state.token}})
    .then(function (response) {
        console.log(response);
        console.log("response status :")
        console.log(response.status);
        if (response.status === 200){
          alert("Questionnaire sucessfuly submited !");
        } else {
          alert("An error occured while sending the questionnaire to the server");
        }
      })
    
    event.preventDefault();
  }

  render() {
    let headMessage;

    // Si il y a eu une erreur le message d'entête affiche l'erreur, sinon, on affiche le nom de l'utilisateur
    if(this.state.error){
      headMessage = <ErrorBanner message={this.state.errorMessage}/>;
    } 
    // Si les données n'ont pas encore été récupérées, on affiche loading
    else if(!this.state.loaded) {
      headMessage = <Loading />
    }
    else {
      headMessage = <h1> Welcome {this.state.firstName} </h1>
    }

    console.log("state before render :");
    console.log(this.state);
    return (
      <div>
      {headMessage}
      <QuestionsForm loaded={this.state.loaded} questions={this.state.questions} 
      handleChange={this.handleChange} handleSubmit={this.handleSubmit} 
      alreadyAnswered={this.state.alreadyAnswered} answered_questions={this.state.answered_questions} />
      </div>
    );
  }
}


// Fonction pour mettre un effet de chargement :
function Loading(props) {
  return( <h1> Loading ... </h1>);
}

function QuestionsForm(props) {
  console.log("Question Form props :");
  console.log(props);

  // Si les questions ne sont pas encore chargé, le question form renvoie null
  if(!props.loaded){
    return null;
  }
  
  // Mappage des questions par thématiques
  const questionMap = mapping(props.questions);

  var displayed = <h2> Survey :</h2>;
  for (var [theme, questionArray] of questionMap) {
    displayed = <div>
                {displayed}
                 <h3> {theme} </h3>
                    <ul>
                      {questionArray.map( (question) => <QuestionArea key={question.id} question={question} 
                      handleChange={props.handleChange} value={props.answered_questions.get(question.id)} /> )}
                    </ul>
                 </div> ;
  
  }
  console.log("displayed");
  console.log(displayed);
  return(
    <form onSubmit={props.handleSubmit}>
    {displayed}
    {props.alreadyAnswered ? <h4> You have already answered this survey</h4> : <input type="submit" value="Submit" /> }
    </form>
  );
} 

function QuestionArea(props) {
  console.log("Question Area props :");
  console.log(props);
  return (
    <div>
      <label>
        {props.question.valeur}
        <input name={props.question.id} type="text" value={props.value} onChange={props.handleChange} />
      </label>
    </div>
  );
}

function mapping(questions) {
  var questionMap = new Map();
  var questionArray = [];
  // Parcours l'ensemble des questions
  questions.map( (question) => {

    // Si la thématique n'a encore jamais été rencontrée
    if(!questionMap.get(question.thematique_id)){
      // On crée un table qui va contenir toute les questions de cette thématique
      questionArray = [ question ];
      // On ajoute ce tableau au dictionnaire
      questionMap.set(question.thematique_id, questionArray);
    }
    // Si la thématique est déjà definie, il suffit d'ajouter la question au tableau
    else {
      questionArray = questionMap.get(question.thematique_id);
      questionArray.push(question);
      questionMap.set(question.thematique_id, questionArray);
    }
  }
  );
  console.log("Question Map");
  console.log(questionMap);
  return (questionMap);
}





export default Sondage;