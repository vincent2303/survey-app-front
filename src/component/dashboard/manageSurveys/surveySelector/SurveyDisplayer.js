import React from 'react'
import ThematiqueDisplayer from './thematiqueDisplayer';
import {GridList, GridListTile} from '@material-ui/core';

const SurveyDisplayer = ({sondage}) => {
    return (
        <GridList spacing={20} cellHeight={'auto'} cols={3} style={{marginTop:'2vh', marginBottom:'6vh'}}>
            {sondage.thematiqueList.map(thematique=>(
                <GridListTile key={thematique.id+'_gridTile'}>
                    <ThematiqueDisplayer key={thematique.id} thematique={thematique}/>
                </GridListTile>
            ))}
        </GridList>
    )
}


export default SurveyDisplayer