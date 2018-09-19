import React from 'react'
import { Paper, Typography } from '@material-ui/core';
import SoftRadar from '../chartDisplayers/SoftRadar';

const ThematiqueDisplayer = ({thematique}) => {
    return (
        <Paper style={{backgroundColor: thematique.backgroundColor, border:'1px solid', borderColor:'#ecf0f1'}} >
            <Typography style={{color:'white', fontFamily: 'Roboto', fontWeight:100, fontSize:'1.7em', textAlign: 'center', padding:'1vh'}} >
                {thematique.title}
            </Typography>
            <SoftRadar thematique={thematique} />
        </Paper>
    )
}


export default ThematiqueDisplayer