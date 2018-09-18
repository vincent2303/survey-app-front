import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { Radar } from 'react-chartjs-2'
import defaults from 'react-chartjs-2'

const data = {
    labels: ['question1', 'question2', 'question3', 'question4', 'question5'],
    datasets: [{
        data: [0.3, 0.2, 0.8 , -0.2, 0.5],
        borderColor: '#2c3e50',
        borderWidth: 1,
        pointRadius: 8,
        pointHoverRadius: 7,
        pointBackgroundColor: '#2c3e50',
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
}

const SoftRadar = ({input}) => {
    return (
        <Radar data={data} options={options} />
)}


export default SoftRadar