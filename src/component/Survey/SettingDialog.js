import React from 'react';
import { connect } from 'react-redux';

import Icon from '@material-ui/core/Icon';
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, TextField, Typography, Snackbar } from '@material-ui/core';

import { getMailIntensity, postMailIntensity } from '../../redux/user/actions/userSurveyActions';

class SettingDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, min: 1, max: 31, inputMailIntensity: 1, showSnackbar: false, snackbarMessage: "Success" };
    }

    showDialog = (open) => event => {
        this.setState({ open: open });
    }

    selectNumber = () => event => {
        var number = parseInt(event.target.value, 10);

        // Avant de mettre la valeur à jour,
        // on vérifié qu'elle est bien dans les bornes
        if(number > this.state.min-1 && number < this.state.max+1){
            this.setState({inputMailIntensity: number });
        }
        
    }

    

    validate = ( message ) => {
        this.setState({ showSnackbar: true, snackbarMessage: message, open: false });
    }
    
    render() {
        // On récupère la fréquence mail quand on a l'user id
        if (!this.props.mailIntensityLoaded && this.props.user_id) {
            this.props.getMailIntensity(this.props.token, () => {

                this.setState({ inputMailIntensity: this.props.mailIntensity})
            });
        }
        
        return(
            <div>
                <Button variant="contained" color="primary" 
                style={{margin: 20}} onClick={this.showDialog(true)}
                disabled={!this.props.mailIntensityLoaded}
                >
                  <Icon>settings</Icon> Fréquence Mail
                </Button>
                <Dialog open={this.state.open} onClose={this.showDialog(false)}>
                    <DialogTitle><Icon>account_circle</Icon> {this.props.firstName} {this.props.lastName} </DialogTitle>

                    <DialogContent>
                        {this.props.mailIntensityError ? <Typography variant="title" color="secondary"> {this.props.mailIntensityError} </Typography>
                        :
                        <TextField
                        label="Jours entre 2 mails ?"
                        type="number"
                        value={this.state.inputMailIntensity}
                        onChange={this.selectNumber()}
                        />
                        }
                    </DialogContent>

                    <DialogActions>
                        <Button color="primary" onClick={this.props.postMailIntensity(this.state.inputMailIntensity, this.props.token, this.props.user_id, this.validate)}>OK</Button>
                        <Button color="secondary" onClick={this.showDialog(false)} >Annuler</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar 
                    open={this.state.showSnackbar}
                    message={this.state.snackbarMessage}
                    autoHideDuration={6000}
                    onClose={() => {this.setState({ showSnackbar: false }); }}
                    />
            </div>
        )
    }
}

const mapActionToProps = {
    getMailIntensity: getMailIntensity,
    postMailIntensity: postMailIntensity,
};

const mapStateToProps = (state) => ({
    firstName: state.userSurvey.firstName,
    lastName: state.userSurvey.lastName,
    user_id: state.userSurvey.user_id,
    token: state.userSurvey.token,
    loaded: state.userSurvey.loaded,

    mailIntensity: state.userSurvey.mailIntensity,
    mailIntensityLoaded: state.userSurvey.mailIntensityLoaded,
    mailIntensityError: state.userSurvey.mailIntensityError,
});

export default connect(mapStateToProps, mapActionToProps) (SettingDialog);