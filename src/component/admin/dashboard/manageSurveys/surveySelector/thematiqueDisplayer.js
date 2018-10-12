import React from 'react'
import { Card, Typography } from '@material-ui/core';

const titleStyle = { fontFamily: 'Roboto', fontSize: '1.5em', color: '#2c3e50', fontWeight: 500, textAlign:'center'}
const questionStyle = { fontFamily: 'Roboto', fontSize: '1em', color: '#2c3e50', fontWeight: 100, marginBottom:'1vh'}

const ThematiqueDisplayer = ({thematique}) => {
    return (
        <Card style={{backgroundColor: '#ecf0f1', margin: '1vh', padding: '1vh'}} >
            <Typography style={titleStyle} >
                {thematique.name}
            </Typography>
            {thematique.questionList.map((question)=>(
                <Typography key={question.id} style={questionStyle} >{question.question}</Typography>
            ))}
        </Card>
    )
}


export default ThematiqueDisplayer