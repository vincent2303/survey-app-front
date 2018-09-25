import React from 'react';
import ErrorBanner from './ErrorBanner';
import decodeToken from './decodeToken';
import Loading from './Loading';
import queryingData from './queryingData';
import postSurvey from './postSurvey.js';
import QuestionsForm from './QuestionsForm';
import Drawer from './Drawer';
import { Typography, Grid, withStyles, Paper } from '@material-ui/core';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background,
    },
    paper: {
        margin: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 3,
    }
});

class Survey extends React.Component {

    constructor(props) {
        super(props);
        //TODO: faire transiter l'url depuis le parent
        this.state = {
            loaded: false, 
            error: false, 
            serverUrl: "http://localhost:4200", 
            comments: new Map(),
            answers: new Map()};
    }

    componentDidMount() {
        // Cette fonction va decoder le token et appeler serverQuery
        decodeToken(this.props, this.changeState, this.serverQuery);
    }

    changeState = (params, next) => {
        // Si  la variable next n'est pas définie, elle est une fonction nulle
        next = (typeof next === 'undefined') ? () => {} : next;

        this.setState( () => {
            return (params)
        }, next);
        this.forceUpdate();
    }

    serverQuery = () => {
        //TODO: ajouter le mappage des questions et comentaires
        queryingData(this.state, this.changeState);
    }

    handleChange = params => event => {
        if(params.type){
            switch (params.type) {
                case 'radioButton':
                    this.state.answers.set(params.id, params.value);
                    break;
                
                case 'comment':
                    this.state.comments.set(params.id, event.target.value);
                    break;

                case 'modifier':
                    this.setState({ alreadyAnswered: false });
                    break;

                default:
                    console.log("évènement non reconnu");
            }
        }
        // Si l'argument parmas n'as pas de type on ne peux identifier l'évènement
        else {
            console.log("Un évènement n'a pus être identifier");
        }

        // React ne detecte pas les changements de valeur des
        // dictionnaire dans state
        // On force donc le rendu :
        this.forceUpdate();
    }

    handleSubmit = event => {
        event.preventDefault();
        if(allQuestionsAnswered(this.state.thematiqueList, this.state.answers)){
            postSurvey(this.state, this.changeState);
        }
        else {
            alert("Vous devez répondre à toutes les question ! (Les commentaires ne sont pas obligatoires)");
        }
        
    }

    render () {
        console.log("state render :");
        console.log(this.state);
        
        let headDisplay;

        // Si les données n'ont pas encore été récupérées, on affiche loading
        if(!this.state.loaded) {
            headDisplay = <Loading />;
        }
        else {
            headDisplay = <Typography variant="display3" align="center" color="textPrimary" gutterBottom> Bonjour {this.state.firstName} </Typography>
        }
        return (
            <div>
            {this.state.error ? 
                ( headDisplay = <ErrorBanner message={this.state.errorMessage}/> )
            : (
            <Grid container justify='space-between' className={this.props.classes.root}>
                <Grid item xs={1}>
                    <Drawer />
                </Grid>
                <Grid item xs={10}>
                    <Paper className={this.props.classes.paper}>
                    {headDisplay}
                    <QuestionsForm 
                        state={this.state} 
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={1}>

                </Grid>
            </Grid>
            )
            }
            </div>
        );
    }
}

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

export default withStyles(styles)(Survey);