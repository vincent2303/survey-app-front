
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
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
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <Router>
      <div className={classes.root}>
      
        {/* <AppBar position="static">
          <Toolbar>
            <Grid 
              container
              direction="row"
              alignItems="center"
              justify="space-between"
              > 
              <Grid item xs={3} >
                <IconButton
                  aria-owns={anchorEl ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={this.handleClose}
                >
                  <MenuItem component={Link} to="/sondage"  >Sondage </MenuItem>
                  <MenuItem component={Link} to="/admin"  > Admin </MenuItem>
                  <MenuItem component={Link} to="/dashboard" > Dashboard </MenuItem>
                </Menu>
                </Grid>
                <Grid item xs={3} style={{textAlign:"center"}}>
                  <Typography variant="title" color="inherit">Site trop swag</Typography>
                </Grid>
                <Grid item xs={3} style={{textAlign:"right"}}>
                <IconButton
                  component={Link}
                  to="/admin"     
                  color="inherit"
                  >
                  <AccountCircle/>
                </IconButton>
                </Grid>
              </Grid>
          </Toolbar>
        </AppBar> */}
      
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