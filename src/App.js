
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { checkLogin } from './redux/admin/actions/authAction' 

import Login from './component/admin/Login.js';
import Survey from './component/Survey/Survey.js';
import AdminMain from './component/admin/dashboard/AdminMain.js';
import UserMain from './component/user/main/UserMain.js';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {
  state = {
    redirect: true,
  };

  constructor(props){
    super(props)
    if(!window.location.href.includes("login") && !window.location.href.includes("sondage")){
      props.checkLogin();
    }
    if(window.location.href.includes("login") || window.location.href.includes("sondage") || window.location.href.includes("admin") || window.location.href.includes("user")){
      this.state.redirect = false;
    } else {
      this.state.redirect = true;
    }
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {

    return (
      <Router>
      <div>
      { this.state.redirect &&
        <Redirect to="/user" />
        }
        <Route path="/login" component={Login} />
        <Route path="/sondage" component={Survey} />
        <Route path="/admin" component={AdminMain} />
        <Route path="/user" component={UserMain} />
      </div>
      </Router>
    );
  }
}
const mapStateToProps = () => {
  return {
  }
};

const mapActionsToProps = {
  checkLogin: checkLogin
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(App));