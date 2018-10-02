import React from 'react';
import axios from 'axios';
import {AppBar, Toolbar, Typography, Grid, Tabs, Tab, Button} from '@material-ui/core';
import GeneralStat from './generalStats/GeneralStat'
import Survey from './specificSurvey/Survey';
import ManageUser from './manageUsers/ManageUser';
import SurveyManager from './manageSurveys/ManageSurveys';
const labelStyle = {
    color:'#2c3e50'
}

class AdminMain extends React.Component{

    state = {
        value: 2,
        admin_name: "",
    };

    constructor(props){
        super(props);
        
    }

    componentDidMount(){
/*         let decoded = jwt.verify(localStorage.getItem('token'), "mon secret");
        this.setState({admin_name : decoded.pseudo}); */
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleClick = () => {
        axios.get("http://localhost:4200/admin/logout")
        .then( res => {
            console.log(res);
            window.location = '/login';
        });
      };
      
    render(){
        const { value } = this.state;
        return (
            <div>
                <AppBar position='sticky' style={{backgroundColor: 'white', padding:0, margin:0}} >
                    <Grid container alignItems="center">
                        <Grid item sm={2}>
                            <Toolbar>
                                <Typography variant="title" style={{color: '#2c3e50', fontFamily: 'Roboto', fontWeight:100}}>
                                    Welcome {this.state.admin_name}
                                </Typography>
                            </Toolbar>
                        </Grid>
                        <Grid item sm={9} >
                            <Tabs value={value} onChange={this.handleChange} fullWidth style={{marginTop:'10px'}} >
                                <Tab label="General Statistics" style={labelStyle} />
                                <Tab label="Sepecific Survey" style={labelStyle} />
                                <Tab label="Create & Manage Survey" style={labelStyle} />
                                <Tab label="Manage Users" style={labelStyle} />
                            </Tabs>
                        </Grid>
                        <Grid item sm={1} >
                        <Button variant="contained" color="secondary" onClick={this.handleClick}>
                            Logout
                        </Button>
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