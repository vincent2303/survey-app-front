import React from 'react'
import ThematiqueDisplayer from './thematiqueDisplayer';

const SondageDisplayer = ({sondage}) => {
    return (
        <div>
            {sondage.thematiqueList.map(thematique=>(
                <ThematiqueDisplayer key={thematique.id} thematique={thematique}/>
            ))}
        </div>
    )
}


export default SondageDisplayer