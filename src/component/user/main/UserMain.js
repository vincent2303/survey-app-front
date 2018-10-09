import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {AppBar, Toolbar, Typography, Drawer, Divider} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { SubjectRounded, HomeRounded, EqualizerRounded, LockRounded } from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { toggleDrawer, switchPage, getUser} from '../../../redux/user/actions/userMainActions';
import { logout } from '../../../redux/admin/actions/authAction';
import Home from './home/Home';
import Stat from './stat/Stat';
import Account from './account/Account';
import Survey from '../../Survey/Survey';
import AdminMain from '../../admin/dashboard/AdminMain';

const styles = theme => ({
    labelStyle :{
        color:'#2c3e50'
    },
    firstDivStyle :{
         padding:'3vh', 
         backgroundColor:'#2c3e50', 
         minHeight:"100vh",
    },
    root: {
        flexGrow: 1,
      },
      grow: {
        flexGrow: 1,
      },
      menuButton: {
        marginLeft: -12,
        marginRight: 20,
      },
      pageTitle: {
        flexGrow: 1,
        color: "inherit"
      },
      button: {
        margin: theme.spacing.unit,
      }
});
class UserMain extends Component {
    state = {
        anchorEl: null,
    };
    
    constructor(props){
        super(props);

        this.onListItemClick = this.onListItemClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
    }

    componentDidMount(){
        this.props.getUser();
    }

    onToggleMenu(event){
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    onToggleDrawer = (open) => () => {
        this.props.onToggleDrawer(open);
    }

    onListItemClick = (pageNb) => () => {
        this.props.onListItemClick(pageNb);
    }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
        <div>
      <div className={classes.root}>
        <AppBar position='static' style={{backgroundColor: '#4286f4', padding:0, margin:0}} >
            <Toolbar>
                <IconButton className={classes.menuButton} onClick={this.onToggleDrawer(true)} color="inherit" aria-label="Menu">
                <MenuIcon />
                </IconButton>
                {this.props.selectedPage === 0 && <Typography className={classes.pageTitle} variant="title" align="center">  Home </Typography>}
                {this.props.selectedPage === 1 && <Typography className={classes.pageTitle} variant="title" align="center">  Survey </Typography>}
                {this.props.selectedPage === 2 && <Typography className={classes.pageTitle} variant="title" align="center">  Stat </Typography>}
                {this.props.selectedPage === 3 && <Typography className={classes.pageTitle} variant="title" align="center">  Account </Typography>}
                {this.props.connectedUser && <Typography color="inherit">Welcome {this.props.connectedUser.lastName}</Typography>}
                <div>
                    <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.onToggleMenu}
                    color="inherit"
                    >
                    <AccountCircle />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                    >
                    <MenuItem onClick={this.props.onLogout}>Logout</MenuItem>
                    <MenuItem onClick={this.onListItemClick(3)}>My account</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
        <Drawer open = {this.props.toggleDrawer} onClose = {this.onToggleDrawer(false)}>
            <List component="nav">
            <ListItem
                button
                selected={this.props.selectedPage === 0}
                onClick={this.onListItemClick(0)}
            >
                <ListItemText primary="Home" />
                <HomeRounded/>
            </ListItem>
            <ListItem
                button
                selected={this.props.selectedPage === 1}
                onClick={this.onListItemClick(1)}
            >
                <ListItemText primary="Survey" />
                <SubjectRounded/>
            </ListItem>
            <ListItem
                button
                selected={this.props.selectedPage === 2}
                onClick={this.onListItemClick(2)}
            >
                <ListItemText primary="User stat" />
                <EqualizerRounded/>
            </ListItem>
            <Divider/>
            <ListItem
                button
                selected={this.props.selectedPage === 4}
                onClick={this.onListItemClick(4)}
            >
                <ListItemText primary="Admin" />
                <LockRounded/>
            </ListItem>
            </List>
        </Drawer>
        <div className={classes.firstDivStyle}>
            {this.props.selectedPage === 0 && <Home/> }
            {this.props.selectedPage === 1 && <Survey/> }
            {this.props.selectedPage === 2 && <Stat/> }
            {this.props.selectedPage === 3 && <Account/> }
            {this.props.selectedPage === 4 && <Redirect to="/admin" /> }
        </div>
      </div>
      </div>
    )
  }
}
const mapStateToProps = (state, props) => {
    return {
        toggleDrawer: state.userMain.toggleDrawer,
        selectedPage: state.userMain.selectedPage,
        redirectToLogin: state.userMain.redirectToLogin,
        connectedUser: state.userMain.connectedUser,
    }
};

const mapActionsToProps = {
    onToggleDrawer: toggleDrawer,
    onListItemClick: switchPage,
    getUser: getUser,
    onLogout: logout,
    
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(UserMain))
