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
        backgroundColor: '#2c3e50',
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    }
});

class Survey extends React.Component {

    constructor(props) {
        super(props);

        console.log("token :", props.token);
        console.log("isConnected :", props.isConnected);
        // On récupère un token si l'utilisateur est connecté et qu'il n'en a pas 
        if (!props.token) {
            if (props.isConnected) {
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


    render() {


        let headDisplay;
        // Si les données n'ont pas encore été récupérées, on affiche loading
        if (!this.props.loaded) {
            headDisplay = <Loading />;
        }
        else {
            headDisplay = <Typography variant="headline" align="center" color="textPrimary" gutterBottom> Bonjour {this.props.firstName} </Typography>
        }
        return (
            <div>
                {this.props.error ?
                    (headDisplay = <ErrorBanner message={this.props.errorMessage} />)
                    : (
                        <Grid container direction='column'>
                            <Grid item>
                                <SettingDialog />
                            </Grid>
                            <Grid item>

                                <Paper className={this.props.classes.paper}>
                                    {headDisplay}
                                    <QuestionsForm />
                                </Paper>
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

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Survey));