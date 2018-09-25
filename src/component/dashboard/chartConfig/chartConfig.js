import setYRange from './setYRange'

const type_softLineCircle_constructor = function(inputData){ // soft circle graph
    const {min, max} = setYRange(inputData.dataArray)
    let chartData = {
        labels: inputData.xLabel,
        datasets:[{
            label: inputData.elementLabel,
            data: inputData.dataArray,
            fill: false,
            pointRadius: 6,
            pointHoverRadius: 5,
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            backgroundColor: inputData.boxColor,
            borderWidth: 2,
            lineTension: 0,
            borderColor: 'white',
        }],
    }
    let option = {
        legend: {display: false},
        scales: {
            xAxes:[{
                display: false
            }],
            yAxes:[{
                display: false,
                ticks: {suggestedMin: min, suggestedMax: max}
            }]
        },
        layout: { padding:{left: 10, right: 10}}
    }
    return {chartData: chartData, option: option, boxColor: inputData.boxColor}
}

const type_softBar_constructor = function(inputData){ // soft bar
    const {min, max} = setYRange(inputData.dataArray)
    let chartData = {
        labels: inputData.xLabel,
        datasets:[{
            label: inputData.elementLabel,
            data: inputData.dataArray,
            backgroundColor: 'white'
        }],
    }
    let option = {
        legend: {display: false},
        scales: {
            xAxes:[{
                display: false
            }],
            yAxes:[{
                display: false,
                ticks: {suggestedMin: min, suggestedMax: max}
            }]
        },
    }
    return {chartData: chartData, option: option, boxColor: inputData.boxColor}
}

const type_softLine_constructor = function(inputData){ // soft line graph
    const {min, max} = setYRange(inputData.dataArray)
    let chartData = {
        labels: inputData.xLabel,
        datasets:[{
            label: inputData.elementLabel,
            data: inputData.dataArray,
            borderColor: 'white',
            borderWidth: 1,
            pointRadius: 2,
            pointBackgroundColor: 'white'
        }],
    }
    let option = {
        legend: {display: false},
        scales: {
            xAxes:[{
                display: false
            }],
            yAxes:[{
                display: false,
                ticks: {suggestedMin: min, suggestedMax: max}
            }]
        },
    }
    return {chartData: chartData, option: option, boxColor: inputData.boxColor}
}

const type_longSoftLine_constructor = function(inputData){ // first line (month happyness)
    const {min, max} = setYRange(inputData.dataArray)
    let chartData = {
        labels: inputData.xLabel,
        datasets:[{
            label: inputData.elementLabel,
            data: inputData.dataArray,
            fill: true,
            borderColor: '#16a085',
            borderWidth: 2,
            pointRadius: 2,
            pointBackgroundColor: '#16a085',
            backgroundColor: '#16a085',
        }],
    }
    let option = {
        legend: {display: false},
        maintainAspectRatio: false,
        scales: {
            xAxes:[{
                display: true,
                gridLines: {
                    display: false,
                    color: '#2c3e50'
                },
                ticks:{
                    fontColor: '#2c3e50'
                }
            }],
            yAxes:[{
                display: true,
                ticks: {
                    suggestedMin: min,
                    suggestedMax: max,
                    fontColor: '#2c3e50'
                },
                gridLines: {
                    display: false,
                    color: '#2c3e50',
                }
            }]
        },
    }
    return {chartData: chartData, option: option, boxColor: inputData.boxColor}
}

const type_doubleCircleLine_constructor = function(inputData){ // soft circle graph
    const minMax1 = setYRange(inputData.dataArray[0])
    const minMax2 = setYRange(inputData.dataArray[1])
    const min = Math.min(minMax1.min, minMax2.min)
    const max = Math.min(minMax1.max, minMax2.max)
    let chartData = {
        labels: inputData.xLabel,
        datasets:[{
            label: inputData.elementLabel[0],
            data: inputData.dataArray[0],
            lineTension: 0,
            pointRadius: 8,
            pointHoverRadius: 7,
            pointBorderColor: '#16a085',
            pointBorderWidth: 3,
            borderWidth: 3,
            borderColor: '#16a085',
            pointBackgroundColor: inputData.boxColor
        },
        {
            label: inputData.elementLabel[1],
            data: inputData.dataArray[1],
            lineTension: 0,
            pointRadius: 8,
            pointHoverRadius: 7,
            pointBorderColor: '#2980b9',
            pointBorderWidth: 3,
            borderWidth: 3,
            borderColor: '#2980b9',
            pointBackgroundColor: inputData.boxColor
        }],
    }
    let option = {
        maintainAspectRatio: false,
        scales: {
            xAxes:[{
                display: true,
                gridLines: {
                    display: false,
                    color: '#2c3e50'
                },
                ticks:{
                    fontColor: '#2c3e50'
                }
            }],
            yAxes:[{
                display: true,
                ticks: {
                    fontColor: '#2c3e50',
                    suggestedMin: 0,
                    suggestedMax: max
                },
                gridLines: {
                    display: false,
                    color: '#2c3e50',
                }
            }]
        },
    }
    return {chartData: chartData, option: option, boxColor: inputData.boxColor}
}

export { type_softLineCircle_constructor, type_softBar_constructor,type_softLine_constructor, type_longSoftLine_constructor, type_doubleCircleLine_constructor }