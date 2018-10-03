import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import axios from 'axios';
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
import { cycleWeek, cycleMonth } from './cycle';

const input1 = {
    xLabel: cycleWeek(),
    elementLabel: 'mail envoyé',
    boxColor: '#2980b9',
}

const input2 = {
    xLabel: cycleWeek(),
    elementLabel: 'sondage remplis',
    boxColor: '#3498db'
}

const input3 = {
    xLabel: cycleWeek(),
    elementLabel: 'mail sent/sondage answered',
    backgroundColor: '#e74c3c',
    boxColor: '#f39c12'
}

const input4 = {
    xLabel: cycleWeek(),
    elementLabel: 'satisfaction',
    backgroundColor: '#e74c3c',
    boxColor: '#c0392b'
}


class GeneralStat extends Component {

    state = {
        totalSent: Number,
        totalAnswered: Number,
        totalRate: Number,
        totalWeek: Number,
        monthSent: [],
        monthAnswered: [],
        todayRate: Number,
        todaySatis: Number,
        monthSatis: [],
        weekRate: [],
        loaded: false,
        data: [],
    }

    componentDidMount(){
        axios.get('http://localhost:4200/admin/generalStatistics', {headers:{Authorization: "bearer "+ localStorage.getItem('token')}})
        .then(res => {
            this.setState({
                totalSent: res.data.totalSentSondage,
                totalAnswered: res.data.totalAnsweredSondage,
                totalRate: res.data.totalRate,
                totalSatis: res.data.totalSatis,
                monthSent: res.data.monthSentSondage,
                monthAnswered: res.data.monthAnsweredSondage,
                todayRate: res.data.todayAnsweredSendedRate,
                todaySatis: res.data.todayAverageSatisfaction,
                monthSatis: res.data.monthAverageSatisfaction,
                weekRate: res.data.weekRate,

            }, () => {
                const data1 = this.weekDataConstructor(
                    input1,
                    type_softLineCircle_constructor,
                    this.state.monthSent, 
                    this.state.totalSent, 
                    "Total sent sondages");
                const data2 = this.weekDataConstructor(
                    input2, 
                    type_softLineCircle_constructor,
                    this.state.monthAnswered, 
                    this.state.totalAnswered, 
                    "Total answered sondages");
                const data3 = this.weekDataConstructor(
                    input3, 
                    type_softLine_constructor,
                    this.state.monthSatis, 
                    this.state.totalSatis, 
                    "Total satisfaction");
                const data4 = this.weekDataConstructor(
                    input4, 
                    type_softBar_constructor,
                    this.state.weekRate, 
                    this.state.totalRate,
                    "Total sondage answer rate");
                const data5 = this.monthSatisfaction(this.state.monthSatis);
                const data6 = this.monthSA([this.state.monthSent,this.state.monthAnswered]);
                this.setState({
                    data: [data1,data2, data3, data4, data5, data6],
                    loaded: true,
                })
                
            });
        })
    }

    weekDataConstructor(type, constructor, dataList, dataTotal, name){
        let input = type;
        input.dataArray = dataList.slice(0,7).reverse();
        let data1 = constructor(input);
        data1.total = dataTotal;
        data1.name = name;
        return(data1);
    }

    monthSA(dataList){
        const input6 = {
            dataArray: [
                dataList[0].slice(0,30).reverse(),
                dataList[1].slice(0,30).reverse(),
            ],
            xLabel: cycleMonth(),
            elementLabel: [
                'mail envoyé',
                'reponses'
            ],
            boxColor: '#ecf0f1'
        }
        return(type_doubleCircleLine_constructor(input6))
    }
    
    monthSatisfaction(dataList){
        const input5 = {
            dataArray: dataList.slice(0,30).reverse(),
            xLabel: cycleMonth(),
            elementLabel: 'Satisfaction',
            boxColor: '#ecf0f1'
        }
        return(type_longSoftLine_constructor(input5));
    }

    render(){
        return(
            <div>
                {this.state.loaded &&
                <Grid style={{padding: '5vh', backgroundColor: '#2c3e50'}} >
                    <Grid container direction="row" justify="space-between">
                        <Grid item style={{width: '22%'}} >
                            <SoftLineCircle data={this.state.data[0]} />
                        </Grid>
                        <Grid item style={{width: '22%', height: 'auto'}}>
                            <SoftLineCircle data={this.state.data[1]} />
                        </Grid>
                        <Grid item style={{width: '22%'}}>
                            <SoftLine data={this.state.data[2]} />
                        </Grid>
                        <Grid item style={{width: '22%'}}>
                            <SoftBar data={this.state.data[3]} />
                        </Grid>
                    </Grid>
                    <Grid>
                        <LongSoftLine data= {this.state.data[4]} />
                    </Grid>
                    <Grid >
                        <DoubleCircleLine data= {this.state.data[5]} />
                    </Grid>
                </Grid>
                }
            </div>
        )
    }
}

export default GeneralStat
