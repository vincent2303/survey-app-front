
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
    console.log(window.location.href.includes("login"));
    if(window.location.href.includes("login") || window.location.href.includes("sondage")){
      this.state.redirect = false;
    } else {
      this.state.redirect = true;
    }
    console.log(this.state.redirect);
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
        <Route path="/login" component={Login} />
        <Route path="/sondage" component={Sondage} />
        <Route path="/admin" component={AdminMain} />
        { this.state.redirect &&
        <Redirect to="/admin" />
        }
      </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);