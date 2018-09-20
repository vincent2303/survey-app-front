import React from 'react'
import { Card, TextField, Button } from '@material-ui/core';
import idGenerator from '../../../../customFunction/idGenerator';

const ThematiqueAdder = ({thematiqueId, thematique, addQuestion, changeThematiqueName}) => {

    function handleChangeName(e){
        changeThematiqueName(thematiqueId, e.target.value)
    }

    return (
    <Card style={{padding:'3vh'}} >
        <TextField
          id={thematiqueId}
          label="Thematique Name"
          value={thematique.name}
          onChange={handleChangeName}
          margin="normal"
        />
        <br/>
        <Button variant="contained" onClick={addQuestion} >
            Add Question
        </Button>
    </Card>
)}


export default ThematiqueAdder