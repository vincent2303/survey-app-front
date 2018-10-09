import React, { Component } from 'react'
import { Redirect } from 'react-router'
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

import { connect } from 'react-redux';
import { changePseudo, changePassword, login, showPassword } from '../../redux/admin/actions/authAction'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing.unit,
    },
    button: {
        marginTop: theme.spacing.unit * 3,
    },
    withoutLabel: {
      marginTop: theme.spacing.unit * 3,
    },
    textField: {
      flexBasis: 200,
    },
  });
class Login extends Component {
    state={
        showPassword: false
    }
    handleClick = ()=>{
        this.props.login(this.props.pseudo, this.props.password)
    }

    handleClickShowPassword = () => {
        this.props.showPassword(this.props.booleanShowPassword)
      };

    handleMouseDownPassword = event => {
        event.preventDefault();
      };

    handleKeyPress = (e)=>{
        if (e.target.name==="pseudo") {
            this.props.changePseudo(e)
        }
        if (e.target.name==="password") {
            this.props.changePassword(e)
        }
    }

    render(){
        const { classes } = this.props;
        return(
        <div style={{marginTop: '30vh'}} >
        {this.props.isConnected && <Redirect to="/user" />}
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item>
          <Card className={classes.card} style={{backgroundColor: '#ecf0f1'}} >
            <CardContent>
            <Typography variant="headline" component="h2">Login page</Typography>
            <div>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                <InputLabel htmlFor="adornment-user">Username</InputLabel>
                <Input
                    id="adornment-user"
                    type='text'
                    onChange={this.handleKeyPress}
                    name="pseudo"
                />
                </FormControl>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                <Input
                    id="adornment-password"
                    type={this.props.booleanShowPassword ? 'text' : 'password'}
                    onChange={this.handleKeyPress}
                    name="password"
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                        >
                        {this.props.booleanShowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                </FormControl>
                <Button variant="contained" size="small" color="primary" className={classes.button} onClick={this.handleClick}>
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

const mapStateToProps = state=>{
    return state.auth
}

const mapActionsToProps = {
    changePseudo: changePseudo,
    changePassword: changePassword,
    login: login,
    showPassword: showPassword
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login))