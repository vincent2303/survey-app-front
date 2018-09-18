import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { Radar } from 'react-chartjs-2'
import defaults from 'react-chartjs-2'


const SoftRadar = ({thematique}) => {
    const data = {
        labels: [],
        datasets: [{
            data: [],
            pointRadius: 6,
            pointHoverRadius: 5,
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            borderWidth: 2,
            lineTension: 0,
            pointBackgroundColor: thematique.backgroundCOlor,
            borderColor: 'white',
        }]
    }
    
    const options = {
        legend: {
            display: false
        },
        scale: {
            ticks: {
                display: false,
                maxTicksLimit: 3,
                min: -1,
                max: 1,
            },
            pointLabels:{
                display: false
             },
        }
    };
    thematique.questionList.forEach(question => {
        data.labels.push(question.text)
        data.datasets[0].data.push(question.average)
    });
    return (
        <Radar data={data} options={options} />
)}


export default SoftRadar