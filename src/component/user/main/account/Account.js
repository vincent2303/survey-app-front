import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  card: {
    margin: theme.spacing.unit,
  },
  media: {
    height: 150,
    width: 150
  },
});
export class Account extends Component {

  constructor(props){
    super(props)
  }

  
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="title">
            Welcome to your account page
          </Typography>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Card className={classes.card}>
                <CardMedia
                  image= {`http://localhost:4200${this.props.user.photo}`}
                  title="Profile photo"
                  className={classes.media}
                />
                <CardActions>
                  <Button size="small" color="primary">
                    Change
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item>
              <TextField
                id="standard-name"
                label="Name"
                className={classes.textField}
        
                margin="normal"
              />
            </Grid>
           </Grid>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.userMain.connectedUser
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account))
