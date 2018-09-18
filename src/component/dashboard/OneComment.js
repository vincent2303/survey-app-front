import React from 'react'
import {Paper, Typography} from '@material-ui/core';

const OneComment = ({comment}) => {
    return (
        <Paper style={{margin:'10px', backgroundColor:'#bdc3c7', width:'90%', fontFamily:'Roboto', fontWeight:300, padding:'2vh', margin:'5vh'}}>
            <p style={{fontWeight:'Bold'}} >{comment.author.firstName} {comment.author.lastName} > {comment.thematique} </p>
            <p>{comment.text} </p>
            <p style={{color:'#2980b9'}} >{comment.author.email}</p>
        </Paper>
    )
}


export default OneComment