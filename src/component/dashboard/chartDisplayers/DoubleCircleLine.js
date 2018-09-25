import React from 'react'
import { Line } from 'react-chartjs-2'
import { Paper, Typography, Grid } from '@material-ui/core';

const DoubleCircleLine = ({data}) => {
    return (
        <Paper style={{marginTop: '3vh', height:'80vh', backgroundColor: data.boxColor, padding:'3vh' }} >
            <Typography style={{ fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}} >
                Sent & Answered mail
            </Typography>
            <Grid style={{ height:'72vh'}} >
                <Line data={data.chartData} options={data.option} />                       
            </Grid> 
        </Paper>
    )
}


export default DoubleCircleLine