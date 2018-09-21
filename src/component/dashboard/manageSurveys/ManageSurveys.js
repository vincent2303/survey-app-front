import React, { Component } from 'react'
import axios from 'axios';
import SurveySelector from './surveySelector/SurveySelector';
import SurveyAdder from './surveyAdder/SurveyAdder'

const firstDivStyle = { padding:'3vh', backgroundColor:'#2c3e50', minHeight:"100vh" }



class SurveyManager extends Component {
    state = {
        sondageList: [],
        currentSondage: new Object,
        loaded: false,
    }

    componentDidMount(){
        axios.get("http://localhost:4200/admin/getSondage",
        {headers:{Authorization: "bearer "+ localStorage.getItem('token')}})
        .then( res => {
            this.setState({sondageList: res.data});
            this.setState({currentSondage: res.data[0]});
            this.setState({loaded: true});
            console.log(this.state.loaded);
        });
    }
    handleChange=(e)=>{
        this.setState({text: e.target.value})
    }
    render(){
        return(
            <div style={firstDivStyle} >
                {!this.state.loaded && <h1>Chargement</h1>}  
                {this.state.loaded && <SurveySelector currentSondage={this.state.currentSondage} sondageList={this.state.sondageList} />}
                <SurveyAdder/>
            </div>
        )
    }
}

export default SurveyManager
