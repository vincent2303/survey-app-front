import React from 'react'
import {Paper} from '@material-ui/core';
import SoftRadar from './Displayers/SoftRadar';

const ThematiqueDisplayer = ({thematique}) => {
    return (
        <Paper style={{backgroundColor: thematique.backgroundColor}} >
            {thematique.title}
            <SoftRadar thematique={thematique} />
        </Paper>
    )
}


export default ThematiqueDisplayer