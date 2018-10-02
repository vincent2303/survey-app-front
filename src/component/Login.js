import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios';
import Cookies from 'universal-cookie';
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


const cookies = new Cookies()

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

    state={
        pseudo:"",
        mp: "",
        redirect: false
    }

    handleClick = ()=>{
        console.log(this.state.pseudo, this.state.password)
        axios({
            url: "http://localhost:4200/admin/login",
            data: {pseudo: this.state.pseudo, password: this.state.password},
            method: 'post',
            withCredentials: true}).then(res=>{
            if(res.status !== 200){
                console.log("error", res.body)
            } else {
                this.setState({redirect: true});
            }
        })
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
      };

    handleMouseDownPassword = event => {
        event.preventDefault();
      };

    handleKeyPress = (e)=>{
        console.log(e.target.name);
        if (e.target.name==="pseudo") {
            this.setState({pseudo: e.target.value})
        }
        if (e.target.name==="mp") {
            this.setState({mp: e.target.value})
        }
    }

    render(){

        const { classes } = this.props;

        return(
        <div>
        {this.state.redirect && <Redirect to="/admin" />}
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item>
          <Card className={classes.card}>
            <CardContent>
            <Typography variant="headline" component="h2">Login page</Typography>
            <div>
                <FormControl >
                <InputLabel htmlFor="adornment-user">Username</InputLabel>
                <Input
                    id="adornment-user"
                    //type={this.state.showPassword ? 'text' : 'password'}
                    type='text'
                    //value={this.state.mp}
                    onChange={this.handleKeyPress}
                    name="pseudo"
                />
                </FormControl>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    onChange={this.handleChange('password')}
                    name="mp"
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                        >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
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

export default withStyles(styles)(Login)