import React from 'react'
import {AppBar, Toolbar, Typography, Grid, Tabs, Tab} from '@material-ui/core';
import GeneralStat from './GeneralStat'
import Survey from './Survey';
import Admin from './Survey/Admin';

const value = 0;
const admin_name = "Vincent";
const labelStyle = {
    color:'#2c3e50'
}

class AdminMain extends React.Component{

    state = {
        value: 1,
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
                        <Grid item sm={3}>
                            <Toolbar>
                                <Typography variant="title" style={{color: '#2c3e50', fontFamily: 'Roboto', fontWeight:100}}>
                                    Welcome {admin_name}
                                </Typography>
                            </Toolbar>
                        </Grid>
                        <Grid item sm={9} >
                            <Tabs value={value} onChange={this.handleChange} fullWidth style={{marginTop:'10px'}} >
                                <Tab label="General Statistics" style={labelStyle} />
                                <Tab label="Sepecific Survey" style={labelStyle} />
                                <Tab label="Create & Manage Survey" style={labelStyle} />
                            </Tabs>
                        </Grid>
                    </Grid>
                </AppBar>
                {value === 0 && <GeneralStat/> }
                {value === 1 && <Survey/> }
                {value === 2 && <Admin/>}
            </div>
        )
    }
} 

export default AdminMain