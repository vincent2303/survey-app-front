import React from 'react'
import { Radar } from 'react-chartjs-2'

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
            pointBackgroundColor: thematique.backgroundColor,
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
                display: true,
                fontSize: 20,
                fontColor: 'white',
                fontStyle: 'lighter'
             },
        },
        layout:{
            padding: { bottom: 30}
        }
    };
    thematique.questionList.forEach(question => {
        data.labels.push(question.keyWord)
        data.datasets[0].data.push(question.avg)
    });
    return (
        <Radar data={data} options={options} />
)}

export default SoftRadar