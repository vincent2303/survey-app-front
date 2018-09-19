import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { Bar } from 'react-chartjs-2'

const SoftBar = ({data}) => {
    const cardStyle = {height:'20vh', backgroundColor: data.boxColor, padding: '3vh', paddingBottom: 0}
    const firstStyle = {color:'white', fontFamily: 'Roboto', fontWeight:300}
    const secondStyle = {color:'white', fontFamily: 'Roboto', fontWeight:100, fontSize:'1em'}
    return (
    <Card style={cardStyle} >
        <Typography variant='display1' style={firstStyle} >9.382</Typography>
        <Typography variant='display1' style={secondStyle} >
            Total answered sondage
        </Typography>
        <Bar data={data.chartData} options={data.option} />
    </Card>
)}


export default SoftBar