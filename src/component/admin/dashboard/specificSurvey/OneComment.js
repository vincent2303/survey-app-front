import React from 'react'
import {Paper} from '@material-ui/core';

const OneComment = ({comment}) => {
    return (
        <Paper style={{backgroundColor:'#bdc3c7', width:'90%', fontFamily:'Roboto', fontWeight:300, padding:'2vh', margin:'5vh'}}>
            <p style={{fontWeight:'Bold'}} >{comment.user.firstName} {comment.user.lastName} > {comment.thematique.name} </p>
            <p>{comment.commentaire} </p>
            <p style={{color:'#2980b9'}} >{comment.user.email}</p>
        </Paper>
    )
}


export default OneComment