import axios from 'axios'
import { Typography, Radio, Paper, withStyles, CircularProgress, FormGroup, FormControlLabel, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import ErrorBanner from './ErrorBanner';


var React = require('react');
const jwt = require('jsonwebtoken');

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  submitArea: {
    marginTop: theme.spacing.unit * 3,
  }
});

class Sondage extends React.Component {
  constructor(props) {
    
    super(props);
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
      themesQuestions: [],
      loaded: false,
      token: '',
      errorMessage: '',
      error: false,
      sondageName: '',
    };

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  
    console.log("starting to read the url :");

    // Verifie si l'url contient un token ou non
    if (props.location.search === ''){
      console.log("no token !");
      this.state = { errorMessage: "Votre Lien est incorrect ! Veuillez utiliser le lien que vous avez reçu par mail !", error: true, };
    }else {

    try {
    var replacedSymbols = '/[/./+/*]/g';
    let token = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape("token").replace(replacedSymbols, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
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
          answeredQuestions: new Map(),
          comments: new Map(),
        };
    axios.get('http://localhost:4200/user/getSondage',{headers:{Authorization: "bearer "+ token}})
      .then(res => {
        if(!res.data.alreadyAnswered){
          console.log("you didn't already answered");
          this.setState(() => ({
            thematiqueList: res.data.thematiqueList,
            alreadyAnswered: res.data.alreadyAnswered,
            loaded: true,
            sondageName: res.data.sondageName,
          }));

        } else {
          console.log("you already answered")
          this.setState(() => ({
            thematiqueList: res.data.thematiqueList,
            reponses: res.data.reponseList,
            alreadyAnswered: res.data.alreadyAnswered,
            loaded: true,
            sondageName: res.data.sondageName,
            commentaires: res.data.commentaireList,
          }), () => {
            console.log(this.state.reponses);
            var answeredQuestions = this.state.answeredQuestions;
            var comments = this.state.comments;
            this.state.commentaires.forEach(comment => {
              comments.set(comment.thematique_id, comment.commentaire);
            })
            this.setState({comments: comments});
            this.state.reponses.forEach(reponse => {
              answeredQuestions.set(reponse.question_id, reponse.valeur);
            });
            this.setState({answeredQuestions: answeredQuestions});
          });

          
          
        }
      });
    }
    catch(error) {
      console.log("catched an error :");
      this.state = { errorMessage: "Impossible de récupérer le sondage actuel :(  \n erreur : "+error.message, error: true, };
    }
   }
  }

  handleChange = params => event => {
    console.log("params de handleChange");
    console.log(params);
    console.log(event.target.value);
    // if the change is a radioButton :
    if(params.type === "radioButton"){
      this.state.answeredQuestions.set(params.id, params.value);
    } else if (params.type === "comment" && event.target.value) {
      this.state.comments.set(params.id, event.target.value);
      
    } else {
      console.warn(" L'evènement du DOM n'a pas été reconnu !");
    }
    console.log(this.state.comments);
    // React ne détecte pas le changement de contenu du dictionnaire, il faut donc forcer le rendu !
    this.forceUpdate();
  }

  /*
  handleChange(event) {
    const question_id = event.target.name;
    const answer = event.target.value;
    var answeredQuestions = this.state.answeredQuestions;
    answeredQuestions.set(question_id, answer);
    
    
    console.log("question id :");
    console.log(question_id);
    console.log("answer :")
    console.log(answer);
    console.log(this.state.answeredQuestions);
  }
  */
  
  handleSubmit(event) {
    console.log("submitting form");
    var answeredQuestionsMap = this.state.answeredQuestions;
    var answeredQuestions = [];
    for (var [question_id, answer] of answeredQuestionsMap) {
        answeredQuestions.push({question_id: question_id, answer: answer});
    }
    
    var commentsMap = this.state.comments;
    var comments = [];
    for (var [thematique_id, comment] of commentsMap) {
      comments.push( {thematique_id: thematique_id, answer: comment});
    }
    
    var sondage = { 
      remplissage_id: this.state.remplissage_id,
      sondage_id : this.state.sondage_id,
      answered_questions: answeredQuestions,
      answered_commentaires: comments,
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
    const { classes } = this.props;

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
      headMessage = <Typography variant="display2" align="center" color="textPrimary" gutterBottom> Bonjour {this.state.firstName} </Typography>
    }

    console.log("state before render :");
    console.log(this.state);
    return (
      <main className={classes.layout}>
      <Paper className={classes.paper}>
      {headMessage}
      <QuestionsForm loaded={this.state.loaded} thematiqueList={this.state.thematiqueList} 
      handleChange={this.handleChange} handleSubmit={this.handleSubmit} 
      alreadyAnswered={this.state.alreadyAnswered} answeredQuestions={this.state.answeredQuestions} 
      sondageName={this.state.sondageName} classes={classes} comments={this.state.comments}/>
      </Paper>
      </main>
    );
  }
}

// Design tu du formulaire de question :
function QuestionsForm(props) {
  console.log("Question Form props :");
  console.log(props);

  // Si les questions ne sont pas encore chargé, le question form renvoie null
  if(!props.loaded){
    return null;
  }
  
  // Mappage des questions par thématiques
  //const questionMap = mapping(props.questions);

  // le contenu de la variable displayed s'incremente avec les élement html à afficher au cours du parcours des questions
  var displayed = <Typography variant="title" align="center" gutterBottom color="textSecondary"> Sondage : {props.sondageName}</Typography>;
  console.log("thematiqueList");
  console.log(props.thematiqueList);
  for (var thematique of props.thematiqueList) {
    console.log(thematique);
    var theme = thematique.name;
    var questionArray = thematique.questionList;
    console.log("---- commentaire ----");
    console.log(props.comments);
    console.log(thematique);
    

    // Pour eviter le warning composant uncontrolled
    if(!props.comments.get(thematique.id)){
      props.comments.set(thematique.id, " ");
    }
    var comment = props.comments.get(thematique.id);

    displayed = <div>
                {displayed}
                 <h3> {theme} </h3>
                    <ul>
                      {questionArray.map( (question) => <QuestionArea key={question.id} question={question} 
                      handleChange={props.handleChange} value={props.answeredQuestions.get(question.id)} /> )}
                    </ul>
                    <Typography color="textPrimary"> Commentaire : </Typography>
                    <input 
                    type="text"
                    value={comment}
                    onChange={props.handleChange({id : thematique.id, type: "comment", value: "" })}
                    />
                 </div> ;
  
  }
  console.log("displayed");
  console.log(displayed);
  return(
    <form onSubmit={props.handleSubmit}>
    {displayed}
    <div className={props.classes.submitArea}>
    <Button variant="contained" color="primary" type="submit" disabled={props.alreadyAnswered}> Soumettre </Button>
    {props.alreadyAnswered ? <Typography variant="caption"> You have already answered this survey</Typography> : <span></span> }
    </div>
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
        <FormGroup row>
          <FormControlLabel
          control={
            <Radio 
              color='primary'
              checked={props.value === 1}
              onChange={props.handleChange({id : props.question.id, type: "radioButton", value: 1})}
              />
          }
          label="Satisfait"
          />
          <FormControlLabel
          control={
            <Radio 
              color='default'
              checked={props.value === 0}
              onChange={props.handleChange({id : props.question.id, type: "radioButton", value: 0})}
              />
          }
          label="Indifférent"
          />
          <FormControlLabel
          control={
            <Radio 
              color='secondary'
              checked={props.value === -1}
              onChange={props.handleChange({id : props.question.id, type: "radioButton", value: -1})}
              />
          }
          label="Insatisfait"
          />
        </FormGroup>
      </label>
    </div>
  );
}

/*
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
*/

// Fonction pour mettre un effet de chargement :
function Loading(props) {
  return( 
    <div style={{position: 'relative'}}>
  <Typography variant="display1" align="center" color="textPrimary" gutterBottom>
  Chargement du sondage
  </Typography>
  <CircularProgress color="primary" size={300} thickness={7} style={{marginLeft: '30%'}} />
  </div>
  );
}



Sondage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Sondage);