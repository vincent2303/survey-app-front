import React, { Component } from 'react'
import { Paper, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SurveyDisplayer from './SurveyDisplayer';

const titleStyle = { fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}

class SurveySelector extends Component {

    state={
        selectedSondage: this.props.currentSondage,
        sondageList: this.props.sondageList
    }

    getSondageById = (sondageId)=>{
        let newSelectedSondage = this.state.sondageList[0]
        this.state.sondageList.forEach(sondage => {
            if (sondageId === sondage.id) {
                newSelectedSondage = sondage
            }
        });
        return newSelectedSondage
    }

    handleChange = (elem)=>{
        this.setState({selectedSondage: this.getSondageById(elem.target.value)})
    }
    
    render(){
        
        return(
            <Paper style={{padding: '2vh'}} >
                <Typography style={titleStyle} > Select the next sondage </Typography>
                <Select
                    value={this.state.selectedSondage.id}
                    onChange={this.handleChange}
                >
                    {this.props.sondageList.map(sondage=>(
                        <MenuItem key={sondage.id} value={sondage.id} >{sondage.name}</MenuItem>
                    ))}
                </Select>
                <SurveyDisplayer sondage={this.state.selectedSondage} />
                
            </Paper>
        )
    }
}

export default SurveySelector
