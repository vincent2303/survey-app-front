import React, { Component } from 'react'
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    card: {
      minWidth: 275,
      margin: 50,
    },
  });
class SingleAdder extends Component {

    state={
        firstName: "",
        lastName: "",
        email: ""
    }

    handleClick = ()=>{
        this.props.postSingleUser({firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email})
    }

    handleChange = (e)=>{
        if (e.target.name === "firstName") {
            this.setState({firstName: e.target.value})
        }
        if (e.target.name === "lastName") {
            this.setState({lastName: e.target.value})
        }
        if (e.target.name === "email") {
            this.setState({email: e.target.value})
        }
    }
    

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Typography variant="body2">Add single User</Typography>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="firstName"
                        label="Firstname"
                        name="firstName"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="lastName"
                        label="Lastname"
                        name="lastName"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="email"
                        label="Email"
                        name="email"
                        className={classes.textField}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />
                    <Button variant="contained"  size="small" className={classes.button} onClick={this.handleClick}>
                        Add
                    </Button>
                </form>
            </div>
        )
    }
}

SingleAdder.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SingleAdder);