import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { Bar } from 'react-chartjs-2'

const SoftBar = ({data}) => {
    const cardStyle = {height:'25vh', backgroundColor: data.boxColor, padding: '3vh', paddingBottom: 0}
    const firstStyle = {color:'white', fontFamily: 'Roboto', fontWeight:300}
    const secondStyle = {color:'white', fontFamily: 'Roboto', fontWeight:100, fontSize:'1em'}
    return (
    <Card style={cardStyle} >
        <Typography variant='display1' style={firstStyle} >{data.total}</Typography>
        <Typography variant='display1' style={secondStyle} >
        {data.name}
        </Typography>
        <Bar data={data.chartData} options={data.option} />
    </Card>
)}


export default SoftBar