import React, { Component } from 'react';

import './ManageUser.css';
import Adder from './Adder';
import AdminAdder from './AdminAdder';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = {
  card: {
    minWidth: 275,
    margin: 50,
  },
};
class ManageUser extends Component {
  constructor(props){
    super()
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item>
          <Card className={classes.card}>
            <CardContent>
            <Typography variant="headline" component="h2">Admin page</Typography>
              <AdminAdder/>
              <Adder/>
            </CardContent>
          </Card>
          </Grid>
      </Grid>
      </div>
    );
  }
}

ManageUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageUser);
