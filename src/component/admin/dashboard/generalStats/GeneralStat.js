import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import SoftLineCircle from '../chartDisplayers/SoftLineCircle';
import SoftBar from '../chartDisplayers/SoftBar';
import SoftLine from '../chartDisplayers/SoftLine';
import LongSoftLine from '../chartDisplayers/LongSoftLine';
import DoubleCircleLine from '../chartDisplayers/DoubleCircleLine';

import { connect } from 'react-redux';
import { getGeneralStatistics } from '../../../../redux/admin/actions/generalStatisticsAction'

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
        this.props.getGeneralStatistics()
    }

    render(){
        return(
            <div>
                {this.props.loaded &&
                <Grid style={{padding: '5vh', backgroundColor: '#2c3e50'}} >
                    <Grid container direction="row" justify="space-between">
                        <Grid item style={{width: '22%'}} >
                            <SoftLineCircle data={this.props.data[0]} />
                        </Grid>
                        <Grid item style={{width: '22%', height: 'auto'}}>
                            <SoftLineCircle data={this.props.data[1]} />
                        </Grid>
                        <Grid item style={{width: '22%'}}>
                            <SoftLine data={this.props.data[2]} />
                        </Grid>
                        <Grid item style={{width: '22%'}}>
                            <SoftBar data={this.props.data[3]} />
                        </Grid>
                    </Grid>
                    <Grid>
                        <LongSoftLine data= {this.props.data[4]} />
                    </Grid>
                    <Grid >
                        <DoubleCircleLine data= {this.props.data[5]} />
                    </Grid>
                </Grid>
                }
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return state.generalStat
}

const mapActionsToProps = {
    getGeneralStatistics
}

export default connect(mapStateToProps, mapActionsToProps)(GeneralStat)
