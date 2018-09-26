import React from 'react';
import { Typography, Grid, Paper, TextField, FormGroup, FormControlLabel, Radio, Button } from '@material-ui/core';

class QuestionsFrom extends React.Component {
    constructor(props){
        super(props);
        this.state = props.state;
    }

    render() {
        if(!this.props.state.loaded){
            return null;
        } else {
        return (
            <div>
                <Typography variant="display2" align="left" gutterBottom color="textPrimary">
                    Sondage {this.props.state.sondageName}
                </Typography>
                <form onSubmit={this.props.handleSubmit}>
                    <Grid container direction="column">
                        <Thematiques 
                                thematiqueList={this.props.state.thematiqueList}
                                alreadyAnswered={this.props.state.alreadyAnswered}
                                comments={this.props.state.comments}
                                answers={this.props.state.answers}
                                handleChange={this.props.handleChange}
                            />
                            <Grid item>
                                <AnswerButtons 
                                    alreadyAnswered={this.props.state.alreadyAnswered}
                                    handleChange={this.props.handleChange}
                                />
                            </Grid>
                    </Grid>
                </form>
            </div>
        );
        }
    }
}

function AnswerButtons(props){

    return(
        <Grid container justify="flex-end">
            <Grid item>
                <Button 
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={props.alreadyAnswered}
                >
                    Soumettre
                </Button>
            </Grid>
            <Grid item>
                <Button 
                    variant="contained"
                    color="secondary"
                    disabled={!props.alreadyAnswered}
                    onClick={props.handleChange({type: "modifier"})}
                    >
                    Modifier
                </Button>
            </Grid>
        </Grid>
    )
}

function Thematiques(props) {
    return (
        <div>
        <ul>
        {
            props.thematiqueList.map( (theme) => 
                <Grid item style={{margin: 50}} key={"Grid"+theme.id}>
                    <Paper style={{padding: 50, background: '#f9fbff'}} elevation={1} key={"Paper"+theme.id}>
                        <h1> {theme.name} </h1>
                        <QuestionArea 
                            key={"Question"+theme.id} 
                            questions={theme.questionList}
                            answers={props.answers}
                            alreadyAnswered={props.alreadyAnswered}
                            handleChange={props.handleChange}
                            />
                        <CommentArea 
                            key={"Comment"+theme.id}
                            theme={theme}
                            comments={props.comments}
                            handleChange={props.handleChange}
                            alreadyAnswered={props.alreadyAnswered}
                            />
                    </Paper>
                </Grid>
            )
        }
        </ul>
        
        </div>
    );
}
function CommentArea(props){
    // Il faut s'assurer que l'entrée comment pour ce theme existe
    // Afin d'éviter le changement d'état du composant 
    // de controlled a uncontrolled
    if(!props.comments.get(props.theme.id)){
        props.comments.set(props.theme.id, " ");
    }
    var comment = props.comments.get(props.theme.id);

    return(
        <TextField
                        label={`Commentaire pour la thématique ${props.theme.name}`}
                        disabled={props.alreadyAnswered}
                        variant="outlined"
                        fullWidth
                        multiline
                        margin="normal"
                        value={comment}
                        onChange={props.handleChange({id : props.theme.id, type: "comment", value: "" })}
                    />
    )
}

function QuestionArea(props){
    return (
        <ul>
        {props.questions.map( (question) => 
            <div key={"div"+question.id}>
            <Typography 
            key={"title"+question.id}
            variant="headline" 
            color="textPrimary" 
            align="center">
            {question.valeur}
            </Typography>
            <Choices 
                key={"Choices"+question.id}
                question={question}
                answers={props.answers}
                handleChange={props.handleChange}
                alreadyAnswered={props.alreadyAnswered}
            />
            </div>

        )}
        </ul>
    );
}

function Choices(props){
    var choices;
    // On essaye de récupérer les choix internes de la question
    if(props.question.choices){
        choices = props.question.choices;
    }
    // Sinon on met les choix par défaut 
    else {
        choices = [
            {id: 0, label: "Satisfait", value: 1, color: 'primary'},
            {id: 1, label: "Indifférent", value: 0, color: 'default'},
            {id: 2, label: "Insatisfait", value: -1,  color: 'secondary'},
        ];
    }

    var answer = props.answers.get(props.question.id);
    return(
        <FormGroup row>
          <Grid container justify="center" direction="row">
            <ul>
                {choices.map( (choice) => 
                <Grid item key={"item"+choice.id}>
                    <FormControlLabel
                        key={"FormControle"+choice.id} 
                        disabled={props.alreadyAnswered}
                        label={choice.label}
                        control={
                            <Radio
                                key={"Radio"+choice.id}
                                color={choice.color}
                                checked={props.answers.get(props.question.id) === choice.value}
                                onChange={props.handleChange({id: props.question.id, type: "radioButton", value: choice.value})}
                                />
                        }
                    />
                </Grid>
                )}
            </ul>
          </Grid>
        </FormGroup>
    );
}


export default QuestionsFrom;