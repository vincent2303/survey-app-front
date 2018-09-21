import React, { Component } from 'react'
import idGenerator from '../../../customFunction/idGenerator'
import SurveySelector from './surveySelector/SurveySelector';
import SurveyAdder from './surveyAdder/SurveyAdder'

const firstDivStyle = { padding:'3vh', backgroundColor:'#2c3e50', minHeight:"100vh" }

const sondageList = [
    {
        id: 'kjfnvoerboe',
        name: 'sondage cafet et Lounge',
        thematiqueList: [
            {
                id: idGenerator(),
                name: 'Cafeteria',
                questionList:[
                    {
                        id: idGenerator(),
                        question: 'que pensez vous du prix?'
                    },
                    {
                        id: idGenerator(),
                        question: 'que pensez vous des sofa?'
                    },
                    {
                        id: idGenerator(),
                        question: 'Comment etait la temperature'
                    }
                ]
            },
            {
                id: idGenerator(),
                name: 'Lounge',
                questionList:[
                    {
                        id: idGenerator(),
                        question: 'trop de monde?'
                    },
                    {
                        id: idGenerator(),
                        question: 'que pensez vous de l ambiance?'
                    },
                    {
                        id: idGenerator(),
                        question: 'Comment etait la temperature?'
                    }
                ]
            }
        ]
    },
    {
        id: 'zogbkjfbveirb',
        name: 'sondage bureau',
        thematiqueList: [
            {
                id: idGenerator(),
                name: 'bureau',
                questionList:[
                    {
                        id: idGenerator(),
                        question: 'le materielle vous convient il?'
                    },
                    {
                        id: idGenerator(),
                        question: 'la propreté des locaux?'
                    },
                    {
                        id: idGenerator(),
                        question: 'la communication entre les différents services?'
                    }
                ]
            }
        ]
    }
]

const currentSondage = sondageList[0]

class SurveyManager extends Component {

    handleChange=(e)=>{
        this.setState({text: e.target.value})
    }
    render(){
        return(
            <div style={firstDivStyle} >
                <SurveySelector currentSondage={currentSondage} sondageList={sondageList} />
                <SurveyAdder/>
            </div>
        )
    }
}

export default SurveyManager
