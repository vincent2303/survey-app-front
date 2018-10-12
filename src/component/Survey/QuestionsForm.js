import React from 'react';
import { connect } from 'react-redux';

import {
    Typography, Grid, Paper, TextField, FormGroup, FormControlLabel, Radio, Button, Snackbar
} from '@material-ui/core';

import { handleChange } from "../../redux/user/actions/userSurveyActions";

class QuestionsFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showSnackbar: false, snackbarMessage: "Success" };
    }

    validate = (message) => {
        this.setState({ showSnackbar: true, snackbarMessage: message });
    }

    render() {
        if (!this.props.loaded) {
            return null;
        }
        return (
            <div>
                <Typography variant="title" align="center" gutterBottom color="textPrimary">
                    Sondage {this.props.sondageName}
                </Typography>
                <form onSubmit={this.props.handleChange({ type: 'submit' }, this.validate)}>
                    <Grid container direction="column">
                        <Thematiques
                            thematiqueList={this.props.thematiqueList}
                            alreadyAnswered={this.props.alreadyAnswered}
                            comments={this.props.comments}
                            answers={this.props.answers}
                            handleChange={this.props.handleChange}
                        />
                        <Grid item>
                            <AnswerButtons
                                alreadyAnswered={this.props.alreadyAnswered}
                                handleChange={this.props.handleChange}
                            />
                        </Grid>
                    </Grid>
                </form>
                <Snackbar
                    open={this.state.showSnackbar}
                    message={this.state.snackbarMessage}
                    autoHideDuration={6000}
                    onClose={() => { this.setState({ showSnackbar: false }); }}
                />
            </div>
        );

    }
}

function AnswerButtons(props) {
    return (
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
                    onClick={props.handleChange({ type: 'modify' })}
                >
                    Modifier
                </Button>
            </Grid>
        </Grid>
    );
}

function Thematiques(props) {
    return (
        <div>
            <ul>
                {
                    props.thematiqueList.map(theme => (
                        <Grid item style={{ margin: 50 }} key={"Grid" + theme.id}>
                            <Paper style={{ padding: 10, backgroundColor: '#ecf0f1' }} elevation={0} key={"Paper" + theme.id}>
                                <h1 style={{ alignContent: 'center' }}> {theme.name} </h1>
                                <QuestionArea
                                    key={"Question" + theme.id}
                                    questions={theme.questionList}
                                    answers={props.answers}
                                    alreadyAnswered={props.alreadyAnswered}
                                    handleChange={props.handleChange}
                                />
                                <CommentArea
                                    key={"Comment" + theme.id}
                                    theme={theme}
                                    comments={props.comments}
                                    handleChange={props.handleChange}
                                    alreadyAnswered={props.alreadyAnswered}
                                />
                            </Paper>
                        </Grid>
                    ))
                }
            </ul>

        </div>
    );
}
function CommentArea(props) {

    let comment = props.comments.get(props.theme.id);
    return (
        <TextField
            label={`Commentaire pour la thématique ${props.theme.name}`}
            disabled={props.alreadyAnswered}
            variant="outlined"
            fullWidth
            multiline
            margin="normal"
            value={comment}
            onChange={props.handleChange({ id: props.theme.id, type: 'comment' })}
        />
    );
}

function QuestionArea(props) {
    return (
        <ul>
            {props.questions.map(question => (
                <div key={"div" + question.id} style={{padding: 20}}>
                    <h2> {question.valeur}</h2>
                    <Choices
                        key={"Choices" + question.id}
                        question={question}
                        answers={props.answers}
                        handleChange={props.handleChange}
                        alreadyAnswered={props.alreadyAnswered}
                    />
                </div>
            ))}
        </ul>
    );
}

function Choices(props) {
    let choices;
    // On essaye de récupérer les choix internes de la question
    if (props.question.choices) {
        choices = props.question.choices;
    }
    // Sinon on met les choix par défaut
    else {
        choices = [
            {
                id: 0, label: 'Satisfait', value: 1, color: 'primary'
            },
            {
                id: 1, label: 'Indifférent', value: 0, color: 'default'
            },
            {
                id: 2, label: 'Insatisfait', value: -1, color: 'secondary'
            },
        ];
    }
    /*
    return (
        <FormGroup row>
            <Grid container justify="center" direction="row">
                <ul style={{display: "inline"}}>
                    {choices.map(choice => (
                        <li style={{display: "inline"}} key={"li" + choice.id}>
                        <Grid item key={"item" + choice.id}>
                            <FormControlLabel
                                key={"FormControle" + choice.id}
                                disabled={props.alreadyAnswered}
                                label={choice.label}
                                control={
                                    <Radio
                                        key={"Radio" + choice.id}
                                        color={choice.color}
                                        checked={props.answers.get(props.question.id) === choice.value}
                                        onChange={props.handleChange({ id: props.question.id, type: "radioButton", value: choice.value })}
                                    />
                                }
                            />
                        </Grid>
                        </li>
                    ))}
                </ul>
            </Grid>
        </FormGroup>
    );*/
    return(
        <div>
        {choices.map(choice => (
            <label key={"label"+choice.id} style={{padding: 20, fontStyle: 'italic'}}>
            {choice.label}
            <Radio
                key={"radio"+choice.id}
                disabled={props.alreadyAnswered}
                color={choice.color}
                checked={props.answers.get(props.question.id) === choice.value}
                onChange={props.handleChange({ id: props.question.id, type: "radioButton", value: choice.value })}
                />
                </label>
        )
        )
        }
        </div>

    )
}

const mapActionToProps = {
    handleChange: handleChange
};

const mapStateToprops = (state) => ({
    loaded: state.userSurvey.loaded,
    sondageName: state.userSurvey.sondageName,
    comments: state.userSurvey.comments,
    answers: state.userSurvey.answers,
    alreadyAnswered: state.userSurvey.alreadyAnswered,
    thematiqueList: state.userSurvey.thematiqueList,
})
export default connect(mapStateToprops, mapActionToProps)(QuestionsFrom);
