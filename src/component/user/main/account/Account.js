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
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Input from '@material-ui/core/Input';
import { updateAccount, sendUpdate, updatePhoto } from '../../../../redux/user/actions/userAccountActions';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit,
  },
  title: {
    margin: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
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

    this.updatePhoto = this.updatePhoto.bind(this);
  }

  handleKeyPress = (e)=>{
    this.props.onUpdateUser(e.target)
  }

  onSubmitChange = () => {
    this.props.submitChange(this.props.user)
  }

  updatePhoto = (event) => {
    console.log(event.target.result);
    this.props.updatePhoto(event.target.result);
  }

  onImageUpload = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = this.updatePhoto;
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root} elevation={1}>
          <div className={classes.title}>
            <Typography variant="title" >
              Welcome to your account page
            </Typography>
          </div>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.card}
          >
            <Grid item sm={4}>
              <Toolbar>
                <Card className={classes.card}>
                  <CardMedia
                    image= {`http://localhost:4200${this.props.user.photo}`}
                    title="Profile photo"
                    className={classes.media}
                  />
                  <CardActions>
                    <Button size="small" color="primary" >
                      <input type="file" onInput={this.onImageUpload} accept=".jpg, .jpeg, .png" />
                    </Button>
                  </CardActions>
                </Card>
              </Toolbar>
            </Grid>
            <Grid item sm={8}>
              <Toolbar>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <TextField
                      id="standard-name"
                      label="Firstname"
                      name="firstName"
                      className={classes.textField}
                      onChange={this.handleKeyPress}
                      value={this.props.user.firstName}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-name"
                      label="Lastname"
                      name="lastName"
                      className={classes.textField}
                      onChange={this.handleKeyPress}
                      value={this.props.user.lastName}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-name"
                      label="Email"
                      name="email"
                      className={classes.textField}
                      onChange={this.handleKeyPress}
                      value={this.props.user.email}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-name"
                      label="Pseudo"
                      name="pseudo"
                      className={classes.textField}
                      onChange={this.handleKeyPress}
                      value={this.props.user.pseudo}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="standard-name"
                      label="Password"
                      name="password"
                      className={classes.textField}
                      onChange={this.handleKeyPress}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </Toolbar>
            </Grid>
            <Grid item>
              <Button onClick={this.onSubmitChange}>
                Submit
              </Button>
            </Grid>
           </Grid>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.account.connectedUser
})

const mapDispatchToProps = {
  onUpdateUser : updateAccount,
  submitChange : sendUpdate,
  updatePhoto : updatePhoto,
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account))
