import React, { Component } from 'react'
import { Paper, Typography, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import idGenerator from '../../../../../customFunction/idGenerator'
import ThematiqueAdder from './ThematiqueAdder';
import axios from 'axios';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import { connect } from 'react-redux';
import { postSurvey } from '../../../../../redux/admin/actions/manageSurveyAction';

// juste pour pas avoir les warning unused
if (Link && Element && Events && scrollSpy && scroller) {}

const titleStyle = { fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}
const messageMissingSurveyName = "missing the survey name"
const messageNoThematique = "a survey must have at least one thematique"
const messageThematiqueWithoutQuestion = "a thematique has no question"
const messageMissingThematiqueName = "missing a thematique name"
const messageMissingQuestionText = "missing a question text"
const messageMissingQuestionKeyWord = "missing a question key word"

class SurveyAdder extends Component {

    state={
        name:'',
        thematiqueMap: new Map(),
        open: false,
        missingSurveyName: true,
        missingThematiqueName: true,
        missingQuestionText: true,
        missingQuestionKeyWord: true,
        noThematique: true,
        thematiqueWithoutQuestion: true
    }

    changeSurveyName = (e)=>{
        this.setState({name: e.target.value})
    }

    addThematique = ()=>{
        let emptyThematique = {
            name: '',
            questionMap: new Map()
        }
        let newThematiqueMap = this.state.thematiqueMap
        newThematiqueMap.set(idGenerator(), emptyThematique)
        this.setState({thematiqueMap: newThematiqueMap})
        scroll.scrollToBottom();
    }

    deleteThematique = (thematiqueId)=>{
        let newThematiqueMap = this.state.thematiqueMap
        newThematiqueMap.delete(thematiqueId)
        this.setState({thematiqueMap: newThematiqueMap})
    }

    changeThematiqueName = (thematiqueId, newName)=>{
        let newThematiqueMap = this.state.thematiqueMap
        newThematiqueMap.get(thematiqueId).name = newName
        this.setState({thematiqueMap: newThematiqueMap})
    }

    addQuestion = (thematiqueId)=>{
        let emptyQuestion = {
            text:'',
            keyWord: ''
        }
        let newThematiqueMap = this.state.thematiqueMap
        newThematiqueMap.get(thematiqueId).questionMap.set(idGenerator(), emptyQuestion)
        this.setState({thematiqueMap: newThematiqueMap})
    }

    deletQuestion = (thematiqueId, questionId)=>{
        let newThematiqueMap = this.state.thematiqueMap
        newThematiqueMap.get(thematiqueId).questionMap.delete(questionId)
        this.setState({thematiqueMap: newThematiqueMap})
    }

    changeQuestion = (thematiqueId, questionId, newQuestion)=>{
        let newThematiqueMap = this.state.thematiqueMap
        newThematiqueMap.get(thematiqueId).questionMap.set(questionId, newQuestion)
        this.setState({thematiqueMap: newThematiqueMap})
    }

    postSurvey = ()=>{
        let missingSurveyName = this.state.name.length===0
        let noThematique = this.state.thematiqueMap.size===0
        let missingThematiqueName = false
        let missingQuestionText = false
        let missingQuestionKeyWord = false
        let thematiqueWithoutQuestion = false
        let survey = {
            name: this.state.name,
            thematiqueList: []
        }
        this.state.thematiqueMap.forEach(mappedThematique=>{
            if (!missingThematiqueName && mappedThematique.name.length===0) {
                missingThematiqueName=true
            }
            if (!thematiqueWithoutQuestion && mappedThematique.questionMap.size===0) {
                thematiqueWithoutQuestion = true
            }
            let newThematique = { name:  mappedThematique.name, questionList:[]}
            mappedThematique.questionMap.forEach(question=>{
                if (!missingQuestionText && question.text.length===0) {
                    missingQuestionText=true
                }
                if (!missingQuestionKeyWord && question.keyWord.length===0) {
                    missingQuestionKeyWord=true
                }
                newThematique.questionList.push(question)
            })
            survey.thematiqueList.push(newThematique)
        })
        this.setState({
            missingSurveyName: missingSurveyName,
            missingThematiqueName: missingThematiqueName,
            missingQuestionText: missingQuestionText,
            missingQuestionKeyWord: missingQuestionKeyWord,
            noThematique: noThematique, 
            thematiqueWithoutQuestion: thematiqueWithoutQuestion
        }, ()=>{
            if (missingSurveyName||missingThematiqueName||missingQuestionText||missingQuestionKeyWord|| noThematique||thematiqueWithoutQuestion) {
                this.setState({ open: true });
            }
            else{
                this.props.postSurvey(survey)
            }
        })
    }
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render(){
        return(
            <Paper style={{marginTop:'4vh', padding:'2vh'}} >
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogTitle id="alert-dialog-title">Can't post survey</DialogTitle>
                        {this.state.missingSurveyName && <DialogContentText id="surveyName">{messageMissingSurveyName}</DialogContentText> }
                        {this.state.missingThematiqueName && <DialogContentText id="thematiqueName">{messageMissingThematiqueName}</DialogContentText> }
                        {this.state.missingQuestionText && <DialogContentText id="surveyName">{messageMissingQuestionText}</DialogContentText> }
                        {this.state.missingQuestionKeyWord && <DialogContentText id="surveyName">{messageMissingQuestionKeyWord}</DialogContentText> }
                        {this.state.noThematique && <DialogContentText id="surveyName">{messageNoThematique}</DialogContentText> }
                        {this.state.thematiqueWithoutQuestion && <DialogContentText id="surveyName">{messageThematiqueWithoutQuestion}</DialogContentText> }
                        <Button color="primary" onClick={this.handleClose} >ok</Button>
                    </DialogContent>
                </Dialog>
                <Typography style={titleStyle} > Add a Survey </Typography>
                <TextField
                    id="survey-name"
                    label="Survey Name"
                    value={this.state.name}
                    onChange={this.changeSurveyName}
                    margin="normal"
                />
                <br/>
                {Array.from(this.state.thematiqueMap.keys()).map(key=>(
                    <ThematiqueAdder 
                        key={key} 
                        thematiqueId={key} 
                        thematique={this.state.thematiqueMap.get(key)}
                        changeThematiqueName= {this.changeThematiqueName}
                        addQuestion={this.addQuestion}
                        changeQuestion = {this.changeQuestion}
                        deleteThematique = {this.deleteThematique}
                        deleteQuestion = {this.deletQuestion}
                    />
                ))}
                <br/>
                <Grid container >
                    <Grid item sm={11} >
                        <Button variant="contained" onClick={this.addThematique} >
                            Add a thematique
                        </Button>
                    </Grid>
                    <Grid item sm={1} >
                        <Button variant="contained" color="primary" aria-label="post" onClick={this.postSurvey} >
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = state=>{
    return state.manageSurvey
}

const mapActionsToProps = {
    postSurvey: postSurvey
}

export default connect(mapStateToProps, mapActionsToProps)(SurveyAdder)