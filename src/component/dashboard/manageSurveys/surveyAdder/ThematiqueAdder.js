import React from 'react'
import { Card, TextField, Button, Grid } from '@material-ui/core';
import QuestionAdder from './QuestionAdder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const ThematiqueAdder = ({
    thematiqueId,
    thematique,
    deleteThematique,
    addQuestion,
    deleteQuestion,
    changeThematiqueName,
    changeQuestion
}) => {

    function handleChangeName(e){
        changeThematiqueName(thematiqueId, e.target.value)
    }

    function handleQuestionAdding(){
        addQuestion(thematiqueId)
    }

    function handleDeleteThematique(){
        deleteThematique(thematiqueId)
    }

    return (
    <Card style={{padding:'3vh', marginTop:'2vh', backgroundColor:'#ecf0f1'}} >
        <Grid container>
            <Grid item sm={11} >
            <TextField
            id={thematiqueId}
            label="Thematique Name"
            value={thematique.name}
            onChange={handleChangeName}
            margin="normal"
            />
            </Grid>
            <Grid item sm={1}>
                <Tooltip title="delete">
                    <IconButton aria-label="Delete" onClick={handleDeleteThematique} >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
        <br/>
        {Array.from(thematique.questionMap.keys()).map(questionId=>(
            <QuestionAdder
                key={questionId}
                thematiqueId = {thematiqueId}
                questionId={questionId}
                question={thematique.questionMap.get(questionId)}
                changeQuestion={changeQuestion}
                deleteQuestion= {deleteQuestion}
            />
        ))}
        <br/>
        <Button variant="contained" onClick={handleQuestionAdding} >
            Add Question
        </Button>
    </Card>
)}


export default ThematiqueAdder