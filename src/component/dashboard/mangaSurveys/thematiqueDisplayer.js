import React from 'react'


const ThematiqueDisplayer = ({thematique}) => {
    return (
        <div>
            <h3>
            {thematique.name}
            </h3>
                {thematique.questionList.map((question)=>(
                    <p key={question.id} >{question.question}</p>
                ))}
        </div>
    )
}


export default ThematiqueDisplayer