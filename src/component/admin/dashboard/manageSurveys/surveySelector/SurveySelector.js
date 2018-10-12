import React, { Component } from 'react'
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import SurveyDisplayer from './SurveyDisplayer';

import { connect } from 'react-redux';
import { changeSondageSelection } from '../../../../../redux/admin/actions/manageSurveyAction'

const titleStyle = { fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}

class SurveySelector extends Component {

    getSondageById = (sondageId)=>{
        let newSelectedSondage = this.props.sondageList[0]
        this.props.sondageList.forEach(sondage => {
            if (sondageId === sondage.id) {
                newSelectedSondage = sondage
            }
        });
        return newSelectedSondage
    }

    changeSondageSelection = (e)=>{
        this.props.changeSondageSelection(this.getSondageById(e.target.value))
    }

    handleClick = (e) => {
        axios.post("http://localhost:4200/admin/changeNextSondage",this.props.selectedSondage).then((res)=>{
            console.log(res);
        });
    }
    
    render(){
        
        return(
            <Paper style={{padding: '2vh'}} >
                <Typography style={titleStyle} > Select the next sondage </Typography>
                <Select
                    value={this.props.selectedSondage.id}
                    onChange={this.changeSondageSelection}
                >
                    {this.props.sondageList.map(sondage=>(
                        <MenuItem key={sondage.id} value={sondage.id} >{sondage.name}</MenuItem>
                    ))}
                </Select>
                <SurveyDisplayer sondage={this.props.selectedSondage} />
                <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Grid item sm={1} >
                        <Button variant="contained" color="primary" aria-label="post" onClick={this.handleClick} >
                            Select
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
    changeSondageSelection: changeSondageSelection
}

export default connect(mapStateToProps, mapActionsToProps)(SurveySelector)
