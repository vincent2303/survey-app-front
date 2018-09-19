import React from 'react'
import { Line } from 'react-chartjs-2'
import { Paper, Typography, Grid } from '@material-ui/core';

const LongSoftLine = ({data}) => {
    return (
        <Paper style={{marginTop: '3vh', height:'40vh', backgroundColor: data.boxColor, padding:'3vh' }} >
            <Typography style={{ height: '2vh' ,fontFamily: 'Roboto', fontSize: '2.5em', color: '#2c3e50', fontWeight: 100, textAlign:'center'}} >Month Happyness</Typography>
        <Grid style={{height: '37vh'}} >
                <Line data={data.chartData} options={data.option} />                       
            </Grid> 
        </Paper>
    )
}


export default LongSoftLine