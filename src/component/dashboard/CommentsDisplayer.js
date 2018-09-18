import React from 'react'
import {Paper, Typography} from '@material-ui/core';
import idGenerator from '../../customFunction/idGenerator'
import OneComment from './OneComment';

const CommentsDisplayer = ({comments}) => {
    return (
        <Paper style={{width:'100%', marginTop: '10vh', marginBottom:'3vh' , height:'50vh', overflow: 'scroll'}} >
            <Typography style={{ fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}} > Comments </Typography>
            {comments.map(comment=>(
                <OneComment comment={comment} />
            ))}
        </Paper>

    )
}


export default CommentsDisplayer