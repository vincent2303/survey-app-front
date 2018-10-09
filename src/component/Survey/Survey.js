import React from 'react';
import { connect } from 'react-redux';
import { Typography, Grid, withStyles, Paper } from '@material-ui/core';

import ErrorBanner from './ErrorBanner';
import Loading from './Loading';
import QuestionsForm from './QuestionsForm';
import SettingDialog from './SettingDialog';

import { getSurvey, readUrlToken } from '../../redux/user/actions/userSurveyActions';

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
        props.readUrlToken(window.location.href, props.getSurvey)
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
    readUrlToken: readUrlToken
};

const mapStateToProps = (state) => ({
    //-----------------------
    state: state,
    //------------------------
    userSurvey: state.userSurvey,
    loaded: state.userSurvey.loaded,
    firstName: state.userSurvey.firstName,
    error: state.userSurvey.error,
    errorMessage: state.userSurvey.errorMessage,

});

export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(Survey));