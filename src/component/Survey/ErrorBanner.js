import React from 'react';
import { withStyles, SnackbarContent, Grid, Paper } from '@material-ui/core';

const styles = theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
        justifyContent: 'center',
       
    },
    icon: {
        fontSize: 20,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
    },
    message: {
        fontSize: 30,
    },
});

class ErrorBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item xs={12}>
                <SnackbarContent
                className={this.props.classes.error}
                message={
                    <span className={this.props.classes.message}>
                        {this.props.message}
                    </span>
                }
                />
            </Grid>
        </Grid>
        );
    }
}

export default withStyles(styles)(ErrorBanner);

