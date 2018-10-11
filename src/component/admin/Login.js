import React, { Component } from 'react'
import { Redirect } from 'react-router'
import Grid from '@material-ui/core/Grid';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import { changePseudo, changePassword, login, showPassword } from '../../redux/admin/actions/authAction'
import img from '../../img/login.jpg'

import CustomInput from './CustomInput'
import Btn from './Btn'

const particleConfig = require('./options')

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
        return(
            <div style={{
                height: '100vh',
                width: '100vw',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                backgroundRepeat: 'no-repeat',
              }} >
                {this.props.isConnected && <Redirect to="/user" />}
                <Grid
                  container
                  justify= 'center'
                  alignItems = 'center'
                  spacing={32}
                  style={{
                  position: 'absolute',
                  top: '30vh',
                  zIndex:1,
                }}>
                  <Grid item >
                    <CustomInput placeHolder='Pseudo' keyPress={this.handleKeyPress} />
                  </Grid>
                  <Grid item >
                    <CustomInput placeHolder='Password' keyPress={this.handleKeyPress} />
                  </Grid>
                  <Grid item >
                    <Btn onClick={this.handleClick} />
                  </Grid>
                </Grid>
                <Particles 
                  params={particleConfig}
                  style={{
                      filter: 'brightness(200%)',
                      marginTop: '5vh'
                    }}
                />
              </div>
        )
    }


    // render(){
    //     const { classes } = this.props;
    //     return(
    //     <div>
    //     {this.props.isConnected && <Redirect to="/user" />}
    //     <Grid
    //       container
    //       justify="center"
    //       alignItems="center"
    //       style={{marginTop: '30vh'}}
    //     >
    //       <Grid item>
    //       <Card className={classes.card} style={{backgroundColor: '#ecf0f1'}} >
    //         <CardContent>
    //         <Typography variant="headline" component="h2">Login page</Typography>
    //         <div>
    //             <FormControl className={classNames(classes.margin, classes.textField)}>
    //             <InputLabel htmlFor="adornment-user">Username</InputLabel>
    //             <Input
    //                 id="adornment-user"
    //                 type='text'
    //                 onChange={this.handleKeyPress}
    //                 name="pseudo"
    //             />
    //             </FormControl>
    //             <FormControl className={classNames(classes.margin, classes.textField)}>
    //             <InputLabel htmlFor="adornment-password">Password</InputLabel>
    //             <Input
    //                 id="adornment-password"
    //                 type={this.props.booleanShowPassword ? 'text' : 'password'}
    //                 onChange={this.handleKeyPress}
    //                 name="password"
    //                 endAdornment={
    //                 <InputAdornment position="end">
    //                     <IconButton
    //                     aria-label="Toggle password visibility"
    //                     onClick={this.handleClickShowPassword}
    //                     onMouseDown={this.handleMouseDownPassword}
    //                     >
    //                     {this.props.booleanShowPassword ? <VisibilityOff /> : <Visibility />}
    //                     </IconButton>
    //                 </InputAdornment>
    //                 }
    //             />
    //             </FormControl>
    //             <Button variant="contained" size="small" color="primary" className={classes.button} onClick={this.handleClick}>
    //                 Connect
    //             </Button>
    //         </div>
    //         </CardContent>
    //       </Card>
    //       </Grid>
    //     </Grid>
    //     <Particles 
    //         params={particlesOptions}
    //         style={{ backgroundColor:'red', width: '30%'}}
    //     />
    //   </div>
    //     )
    // }
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

export default connect(mapStateToProps, mapActionsToProps)(Login)