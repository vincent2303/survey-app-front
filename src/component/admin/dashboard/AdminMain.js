import React from 'react';
import {AppBar, Toolbar, Typography, Grid, Tabs, Tab, Button, Popover} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { FaceRounded } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import GeneralStat from './generalStats/GeneralStat'
import Survey from './specificSurvey/Survey';
import ManageUser from './manageUsers/ManageUser';
import SurveyManager from './manageSurveys/ManageSurveys';

import { connect } from 'react-redux';
import { changeAdminPage, logout } from '../../../redux/admin/actions/authAction'


const labelStyle = {
    color:'#2c3e50'
}

const styles = theme => ({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing.unit,
    },
  });

class AdminMain extends React.Component{
    state = {
        anchorEl: null,
        redirectUser: false
      };
    
      handlePopoverOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handlePopoverClose = () => {
        this.setState({ anchorEl: null });
      };

    handleChange = ( event, value) => {
        this.props.changePage(value)
    };

    handleClick = () => {
        this.props.onLogout();
      };
    
      redirectUser = () => {
        this.setState({redirectUser: true})
      }
      
    render(){
        const { classes } = this.props;
        const value = this.props.auth.onPage;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <AppBar position='sticky' style={{backgroundColor: 'white', padding:0, margin:0}} >
                    <Grid container alignItems="center">
                        <Grid item sm={2}>
                            <Toolbar>
                                <Typography variant="title" style={{color: '#2c3e50', fontFamily: 'Roboto', fontWeight:100}}>
                                    Welcome {this.props.user && this.props.user.pseudo}
                                </Typography>
                                <Button
                                aria-owns={open ? 'mouse-over-popover' : null}
                                aria-haspopup="true"
                                onMouseEnter={this.handlePopoverOpen}
                                onMouseLeave={this.handlePopoverClose}
                                onClick={this.redirectUser}
                                >
                                    <FaceRounded/>
                                </Button>
                                <Popover
                                    id="mouse-over-popover"
                                    className={classes.popover}
                                    classes={{
                                        paper: classes.paper,
                                    }}
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    onClose={this.handlePopoverClose}
                                    disableRestoreFocus
                                    >
                                    <Typography>Go back to user page</Typography>
                                </Popover>
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
                            <Toolbar style={{paddingRight:20, paddingLeft:0}}>
                                <Button variant="contained" color="secondary" style={{alignItems:"right"}} onClick={this.handleClick}>
                                    Logout
                                </Button>
                            </Toolbar>
                        </Grid>
                    </Grid>
                </AppBar>
                {value === 0 && <GeneralStat/> }
                {value === 1 && <Survey/> }
                {value === 2 && <SurveyManager/> }
                {value === 3 && <ManageUser/> }
                {this.state.redirectUser && <Redirect to="/user" /> }
            </div>
        )
    }
} 

const mapStateToProps = state=>{
    return {
        auth : state.auth,
        user: state.userMain.connectedUser
    }
}

const mapActionsToProps = {
    changePage: changeAdminPage,
    onLogout: logout
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AdminMain))
