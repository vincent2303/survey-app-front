import React from 'react'
import {AppBar, Toolbar, Typography, Grid, Tabs, Tab} from '@material-ui/core';
import GeneralStat from './generalStats/GeneralStat'
import Survey from './specificSurvey/Survey';
import ManageUser from './manageUsers/ManageUser';
import SurveyManager from './manageSurveys/ManageSurveys';
const admin_name = "Vincent";
const labelStyle = {
    color:'#2c3e50'
}

class AdminMain extends React.Component{

    state = {
        value: 2,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };
      
    render(){
        const { value } = this.state;
        return (
            <div>
                <AppBar position='sticky' style={{backgroundColor: 'white', padding:0, margin:0}} >
                    <Grid container>
                        <Grid item sm={2}>
                            <Toolbar>
                                <Typography variant="title" style={{color: '#2c3e50', fontFamily: 'Roboto', fontWeight:100}}>
                                    Welcome {admin_name}
                                </Typography>
                            </Toolbar>
                        </Grid>
                        <Grid item sm={10} >
                            <Tabs value={value} onChange={this.handleChange} fullWidth style={{marginTop:'10px'}} >
                                <Tab label="General Statistics" style={labelStyle} />
                                <Tab label="Sepecific Survey" style={labelStyle} />
                                <Tab label="Create & Manage Survey" style={labelStyle} />
                                <Tab label="Manage Users" style={labelStyle} />
                            </Tabs>
                        </Grid>
                    </Grid>
                </AppBar>
                {value === 0 && <GeneralStat/> }
                {value === 1 && <Survey/> }
                {value === 2 && <SurveyManager/> }
                {value === 3 && <ManageUser/> }
            </div>
        )
    }
} 

export default AdminMain