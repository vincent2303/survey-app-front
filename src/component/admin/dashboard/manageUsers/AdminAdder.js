import React, { Component } from 'react'
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

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

class AdminAdder extends Component {

    state={
        pseudo:"",
        mp: ""
    }

    handleClick = ()=>{
        axios.post("http://localhost:4200/admin/createAdmin",
                {pseudo: this.state.pseudo, mp: this.state.mp},
                {headers:{Authorization: "bearer "+ this.props.token}})
            .then(res=>{
        })
    }

    handleKeyPress = (e)=>{
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
                <Card className={classes.card}>
                    <CardContent>
                    <Typography variant="title">Ajouter un nouveau administrateur</Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                        id="outlined-name"
                        label="Username"
                        name="pseudo"
                        className={classes.textField}
                        onChange={this.handleKeyPress}
                        margin="normal"
                        variant="outlined"
                        />
                        <TextField
                        id="outlined-password-input"
                        label="Password"
                        onChange={this.handleKeyPress}
                        name="mp"
                        className={classes.textField}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        />
                        <Button variant="contained"  size="small" className={classes.button} onClick={this.handleClick}>
                            <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                            Save
                        </Button>
                    </form>
                    </CardContent>
                 </Card>
            </div>
        )
    }
}
AdminAdder.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(AdminAdder);