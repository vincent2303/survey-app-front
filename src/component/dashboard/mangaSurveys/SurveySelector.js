import React, { Component } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const name = 'aa'
const names=['aa', 'bb', 'cc']

const titleStyle = { fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}

class SurveySelector extends Component {

    state={
        selectedSondage: this.props.currentSondage,
        sondageList: this.props.sondageList
    }

    getSondageById = (sondageId)=>{
        console.log(this.state.sondageList)
        this.state.sondageList.forEach(sondage => {
            if (sondageId === sondage.id) {
                console.log("return getById")
                console.log(sondage)
                return sondage
            }
        });
    }

    handleChange = (elem)=>{
        let newSelectedSondage = this.getSondageById(elem.target.value)
        console.log(newSelectedSondage)
    }

    voir = ()=>{
        console.log(this.state)
    }

    render(){
        return(
            <Paper style={{padding: '2vh'}} >
                <button onClick={this.voir} >dd</button>
                <Typography style={titleStyle} > Select the next sondage </Typography>
                <Select
                    value={this.state.selectedSondage.id}
                    onChange={this.handleChange}
                >
                    {this.props.sondageList.map(sondage=>(
                        <MenuItem key={sondage.id} value={sondage.id} >{sondage.name}</MenuItem>
                    ))}
                </Select>
            </Paper>
        )
    }
}

export default SurveySelector
