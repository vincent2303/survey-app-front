import React, { Component } from 'react'
import SurveySelector from './surveySelector/SurveySelector';
import SurveyAdder from './surveyAdder/SurveyAdder';

import { connect } from 'react-redux';
import { getSondageData } from '../../../../redux/admin/actions/manageSurveyAction';

const firstDivStyle = { padding:'3vh', backgroundColor:'#2c3e50', minHeight:"100vh" }

class SurveyManager extends Component {
    state = {
        sondageList: [],
        currentSondage: null,
        loaded: false,
    }

    componentDidMount(){
        this.props.getSondageData()
    }
    
    render(){
        return(
            <div style={firstDivStyle} >
                {!this.props.loaded && <h1>Chargement</h1>}  
                {this.props.loaded && <SurveySelector currentSondage={this.props.currentSondage} sondageList={this.props.sondageList} />}
                <SurveyAdder/>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return state.manageSurvey
}

const mapActionsToProps = {
    getSondageData: getSondageData
}

export default connect(mapStateToProps, mapActionsToProps)(SurveyManager)
