import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import { 
    type_softLineCircle_constructor, 
    type_softBar_constructor, 
    type_softLine_constructor, 
    type_longSoftLine_constructor, 
    type_doubleCircleLine_constructor 
} from '../chartConfig/chartConfig';
import SoftLineCircle from '../chartDisplayers/SoftLineCircle';
import SoftBar from '../chartDisplayers/SoftBar';
import SoftLine from '../chartDisplayers/SoftLine';
import LongSoftLine from '../chartDisplayers/LongSoftLine';
import DoubleCircleLine from '../chartDisplayers/DoubleCircleLine';

const input1 = {
    dataArray: [105, 120, 115, 134, 100, 129, 100],
    xLabel: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    elementLabel: 'mail envoyé',
    boxColor: '#2980b9',
}

const input2 = {
    dataArray: [30, 50, 30, 40, 60, 50, 60],
    xLabel: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    elementLabel: 'mail envoyé',
    boxColor: '#3498db'
}

const input3 = {
    dataArray: [30, 50, 30, 40, 60, 50, 60],
    xLabel: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    elementLabel: 'mail envoyé',
    backgroundColor: '#e74c3c',
    boxColor: '#f39c12'
}

const input4 = {
    dataArray: [30, 50, 30, 40, 60, 50, 60],
    xLabel: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    elementLabel: 'mail envoyé',
    backgroundColor: '#e74c3c',
    boxColor: '#c0392b'
}

const input5 = {
    dataArray: [30, 50, 30, 40, 60, 50, 60],
    xLabel: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    elementLabel: 'mail envoyé',
    boxColor: '#ecf0f1'
}

const input6 = {
    dataArray: [
        [30, 50, 30, 40, 60, 50, 60],
        [15, 36, 19, 24, 33, 46, 37]
    ],
    xLabel: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    elementLabel: [
        'mail envoyé',
        'reponses'
    ],
    boxColor: '#ecf0f1'
}

const datad_display_1 = type_softLineCircle_constructor(input1)
const datad_display_2 = type_softLineCircle_constructor(input2)
const datad_display_3 = type_softLine_constructor(input3)
const datad_display_4 = type_softBar_constructor(input4)
const datad_display_5 = type_longSoftLine_constructor(input5)
const datad_display_6 = type_doubleCircleLine_constructor(input6)

class GeneralStat extends Component {
    render(){
        return(
            <div>
                <Grid style={{padding: '5vh', backgroundColor: '#2c3e50'}} >
                    <Grid container direction="row" justify="space-between">
                        <Grid item style={{width: '22%'}} >
                            <SoftLineCircle data={datad_display_1} />
                        </Grid>
                        <Grid item style={{width: '22%'}}>
                            <SoftLineCircle data={datad_display_2} />
                        </Grid>
                        <Grid item style={{width: '22%'}}>
                            <SoftLine data={datad_display_3} />
                        </Grid>
                        <Grid item style={{width: '22%'}}>
                            <SoftBar data={datad_display_4} />
                        </Grid>
                    </Grid>
                    <Grid>
                        <LongSoftLine data= {datad_display_5} />
                    </Grid>
                    <Grid >
                        <DoubleCircleLine data= {datad_display_6} />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default GeneralStat
