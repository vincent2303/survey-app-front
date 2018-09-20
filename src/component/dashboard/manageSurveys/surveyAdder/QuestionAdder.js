import React from 'react'
import { Card, TextField, Grid, Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const QuestionAdder = ({
    thematiqueId,
    questionId,
    deleteQuestion,
    question,
    changeQuestion,
}) => {

    function handleQuestionChange(e){
        let newQuestion = question
        if (e.target.name==="text") {
            newQuestion.text = e.target.value
        }
        else if (e.target.name==="key word") {
            newQuestion.keyWord = e.target.value
        }
        changeQuestion(thematiqueId ,questionId, newQuestion)
    }

    function handleDeleteQuestion(){
        deleteQuestion(thematiqueId, questionId)
    }

    return (
    <Card style={{padding: '1vh', marginTop:'1vh', backgroundColor:'#bdc3c7'}} >
        <Grid container>
            <Grid item sm={8}>
                <TextField 
                    fullWidth
                    name='text'
                    id={questionId}
                    label="question text"
                    value={question.text}
                    onChange={handleQuestionChange}
                    margin="normal"
                />
            </Grid>
            <Grid item sm={1} >
            </Grid>
            <Grid item sm={2} >
                <TextField
                    name='key word'
                    id={questionId}
                    label="question key word"
                    value={question.keyWord}
                    onChange={handleQuestionChange}
                    margin="normal"
                />
            </Grid>
            <Grid item sm={1} >
                <Tooltip title="delete">
                    <IconButton aria-label="Delete" onClick={handleDeleteQuestion} >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    </Card>
)}


export default QuestionAdder