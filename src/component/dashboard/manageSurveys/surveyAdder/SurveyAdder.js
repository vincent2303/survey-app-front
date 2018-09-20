import React, { Component } from 'react'
import { Paper, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import idGenerator from '../../../../customFunction/idGenerator'


const titleStyle = { fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}

class SurveyAdder extends Component {

    state={
        name:'',
        thematiqueMap: new Map()
    }

    addThematique = ()=>{
        const idgen = idGenerator()
        let newThematiqueMap = this.state.thematiqueMap
        newThematiqueMap.set(idgen, idgen)
        this.setState({thematiqueMap: newThematiqueMap})
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
                <Button variant="contained" onClick={this.addThematique} >
                    Add a thematique
                </Button>
                <br/>
                {Array.from(this.state.thematiqueMap.keys()).map(key=>(
                    <p key={key} >valeur : {key}</p>
                ))}
            </Paper>
        )
    }
}

export default SurveyAdder