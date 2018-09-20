import React, { Component } from 'react'
import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import idGenerator from '../../../../customFunction/idGenerator'
import ThematiqueAdder from './ThematiqueAdder';


const titleStyle = { fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}


class SurveyAdder extends Component {

    state={
        name:'',
        thematiqueMap: new Map()
    }

    addThematique = ()=>{
        let emptyThematique = {
            name: '',
            questionMap: new Map()
        }
        let newThematiqueMap = this.state.thematiqueMap
        newThematiqueMap.set(idGenerator(), emptyThematique)
        this.setState({thematiqueMap: newThematiqueMap})
    }

    changeThematiqueName = (thematiqueId, newName)=>{
        let newThematiqueMap = this.state.thematiqueMap
        newThematiqueMap.get(thematiqueId).name = newName
        this.setState({thematiqueMap: newThematiqueMap})
    }

    addQuestion = ()=>{
        console.log(this.state)
    }

    render(){
        return(
            <Paper style={{marginTop:'4vh', padding:'2vh'}} >
                <Typography style={titleStyle} > Add a Survey </Typography>
                <TextField
                    id="survey-name"
                    label="Survey Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <br/>
                {Array.from(this.state.thematiqueMap.keys()).map(key=>(
                    <ThematiqueAdder 
                        key={key} 
                        thematiqueId={key} 
                        thematique={this.state.thematiqueMap.get(key)}
                        changeThematiqueName= {this.changeThematiqueName}
                    />
                ))}
                <br/>
                <Button variant="contained" onClick={this.addThematique} >
                    Add a thematique
                </Button>

            </Paper>
        )
    }
}

export default SurveyAdder