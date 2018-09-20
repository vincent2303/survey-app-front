import React from 'react'
import {Card, TextField} from '@material-ui/core';

const ThematiqueAdder = ({thematiqueId, thematique, addQuestion, changeThematiqueName}) => {

    function handleChangeName(e){
        console.log(e.target.value)
    }

    return (
    <Card style={{padding:'3vh'}} >
        <TextField
          id={thematiqueId}
          label="Name"
          value={thematique.name}
          onChange={handleChangeName}
          margin="normal"
        />
    </Card>
)}


export default ThematiqueAdder