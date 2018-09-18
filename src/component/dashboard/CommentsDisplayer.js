import React from 'react'
import {Paper, Typography} from '@material-ui/core';

const CommentsDisplayer = ({comments}) => {
    console.log(comments)
    return (
        <Paper style={{width:'100%', marginTop: '10vh'}} >
            <Typography style={{ fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}} > Comments </Typography>
        </Paper>
    )
}


export default CommentsDisplayer