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
        fontSize: 20,
    },
});

class ErrorBanner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Grid container justify="center">
            <Grid item>
                <SnackbarContent
                className={this.props.classes.error}
                message={
                    <span className={this.props.classes.message}>
                        Test
                    </span>
                }
                />
            </Grid>
        </Grid>
        );
    }
}

export default withStyles(styles)(ErrorBanner);

