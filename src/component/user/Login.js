import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { updatePseudo, updatePass, showPassword, login } from '../../redux/user/actions/loginActions'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit,
    },
    withoutLabel: {
      marginTop: theme.spacing.unit * 3,
    },
    textField: {
      flexBasis: 200,
    },
  });

class Login extends Component {
    constructor(props){
        super(props);
        
        this.onUpdatePseudo = this.onUpdatePseudo.bind(this);
        this.onUpdatePass = this.onUpdatePass.bind(this);
        this.onShowPassword = this.onShowPassword.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onUpdatePseudo(event){
        this.props.onUpdatePseudo(event.target.value);
    }

    onUpdatePass(event){
        this.props.onUpdatePass(event.target.value);
    }

    onShowPassword(){
        this.props.onShowPassword();
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
      };

    onLogin(){
        this.props.onLogin(this.props.user);
    }

  render() {
      const { classes } = this.props;

      return(
        <div style={{marginTop: '30vh'}} >
        {this.props.user.isConnected && <Redirect to="/user" />}
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item>
          <Card className={classes.card} style={{backgroundColor: '#ecf0f1'}} >
            <CardContent>
            <Typography variant="headline" component="h2">User Login page</Typography>
            <div>
                <FormControl >
                <InputLabel htmlFor="adornment-user">Username</InputLabel>
                <Input
                    id="adornment-user"
                    type='text'
                    onChange={this.onUpdatePseudo}
                    name="pseudo"
                />
                </FormControl>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                <Input
                    id="adornment-password"
                    type={this.props.user.showPassword ? 'text' : 'password'}
                    onChange={this.onUpdatePass}
                    name="password"
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.onShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                        >
                        {this.props.user.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                </FormControl>
                <Button variant="contained" size="small" color="primary" className={classes.button} onClick={this.onLogin}>
                    Connect
                </Button>
            </div>
            </CardContent>
          </Card>
          </Grid>
      </Grid>
      </div>
        )
  }
}

const mapStateToProps = (state, props) => {
    console.log(state);
    return {
        user: state.userAuth,
    };
};

const mapActionsToProps = {
    onUpdatePseudo: updatePseudo,
    onUpdatePass: updatePass,
    onShowPassword: showPassword,
    onLogin: login,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login))