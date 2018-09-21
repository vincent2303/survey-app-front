
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



import Login from './component/Login.js';
import Sondage from './component/Sondage.js';
import AdminMain from './component/dashboard/AdminMain.js';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {
  state = {
    redirect: true,
  };
  constructor(){
    super()
    if(window.location.href.includes("login") || window.location.href.includes("sondage") || window.location.href.includes("admin")){
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
        <Redirect to="/admin" />
        }
        <Route path="/login" component={Login} />
        <Route path="/sondage" component={Sondage} />
        <Route path="/admin" component={AdminMain} />
      </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);