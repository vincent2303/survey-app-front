import React from 'react'
import { Card, Typography } from '@material-ui/core'
import { Line } from 'react-chartjs-2'

const SoftLine = ({data}) => {
    const cardStyle = {height:'23vh', backgroundColor: data.boxColor, paddingBottom: 0}
    const firstStyle = {color:'white', fontFamily: 'Roboto', fontWeight:300, padding: '3vh', paddingBottom:0}
    const secondStyle = {color:'white', fontFamily: 'Roboto', fontWeight:100, fontSize:'1em', paddingLeft: '3vh', paddingRight: '3vh'}
    return (
    <Card style={cardStyle} >
        <Typography variant='display1' style={firstStyle} >{data.total}</Typography>
        <Typography variant='display1' style={secondStyle} >{data.name}</Typography>
        <Line data={data.chartData} options={data.option} />
    </Card>
)}


export default SoftLine