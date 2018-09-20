import React, { Component } from 'react'
import { Paper, Typography, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import idGenerator from '../../../../customFunction/idGenerator'
import ThematiqueAdder from './ThematiqueAdder';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const titleStyle = { fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}

class SurveyAdder extends Component {

    state={
        name:'',
        thematiqueMap: new Map()
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

    render(){
        return(
            <Paper style={{marginTop:'4vh', padding:'2vh'}} >
                <Button onClick={this.scrollBottom} >scroll but</Button>
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
                        <Button variant="contained" color="primary" aria-label="Add" >
                            Post
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default SurveyAdder