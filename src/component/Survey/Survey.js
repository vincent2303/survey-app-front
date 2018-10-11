import React from 'react';
import { connect } from 'react-redux';
import { Typography, Grid, withStyles, Paper } from '@material-ui/core';

import ErrorBanner from './ErrorBanner';
import Loading from './Loading';
import QuestionsForm from './QuestionsForm';
import SettingDialog from './SettingDialog';

import { getSurvey, readUrlToken, getToken } from '../../redux/user/actions/userSurveyActions';

const styles = theme => ({
    root: {
        backgroundColor: '#cce0ff',
    },
    paper: {
        margin: theme.spacing.unit * 3,
        padding: theme.spacing.unit * 3,
    }
});

class Survey extends React.Component {

    constructor(props) {
        super(props);
        
        console.log("token :", props.token);
        console.log("isConnected :", props.isConnected);
        // On récupère un token si l'utilisateur est connecté et qu'il n'en a pas 
        if (!props.token){
            if(props.isConnected) {
                props.getToken(props.getSurvey);
            }
            else {
                props.readUrlToken(window.location.href, props.getSurvey);
            }
        }
        else {
            props.getSurvey(props.token);
        }
    }
        

    render () {


        let headDisplay;
        // Si les données n'ont pas encore été récupérées, on affiche loading
        if(!this.props.loaded) {
            headDisplay = <Loading />;
        }
        else {
            headDisplay = <Typography variant="display3" align="center" color="textPrimary" gutterBottom> Bonjour {this.props.firstName} </Typography>
        }
        return (
            <div>
            {this.props.error ? 
                ( headDisplay = <ErrorBanner message={this.props.errorMessage}/> )
            : (
            <Grid container justify='space-between' className={this.props.classes.root}>
                <Grid item xs={1}>
                    <SettingDialog />
                </Grid>
                <Grid item xs={10}>
                    <Paper className={this.props.classes.paper}>
                    {headDisplay}
                    <QuestionsForm />
                    </Paper>
                </Grid>
                <Grid item xs={1}>

                </Grid>
            </Grid>
            )
            }
            </div>
        );
    }
}


const mapActionToProps = {
    getSurvey: getSurvey,
    readUrlToken: readUrlToken,
    getToken: getToken,
};

const mapStateToProps = (state) => ({

    userSurvey: state.userSurvey,
    token: state.userSurvey.token,
    loaded: state.userSurvey.loaded,
    firstName: state.userSurvey.firstName,
    error: state.userSurvey.error,
    errorMessage: state.userSurvey.errorMessage,

    isConnected: state.auth.isConnected,

});

export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(Survey));