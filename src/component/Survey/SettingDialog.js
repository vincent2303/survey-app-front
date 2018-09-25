import React from 'react';
import { Button, Dialog, DialogContent, DialogActions, DialogTitle, TextField } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Axios from 'axios';


class SettingDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, min: 1, max: 31, mailIntensity: 1, serverUrl: props.state.serverUrl };
    }

    showDialog = (open) => event => {
        this.setState({ open: open });
    }

    selectNumber = () => event => {
        var number = parseInt(event.target.value, 10);

        // Avant de mettre la valeur à jour,
        // on vérifié qu'elle est bien dans les bornes
        if(number > this.state.min-1 && number < this.state.max+1){
            this.setState({mailIntensity: number });
        }
        
    }

    post = () => event => {
        var body = { newIntensity: this.state.mailIntensity, user_id: this.props.state.user_id };
        try {
        Axios.post(this.state.serverUrl+'/user/changeFreq', body, {headers:{Authorization: "bearer "+this.props.state.token}}).then( (res) => {
            if(!res.status === 200) {
                console.log("Erreur au cours du changement de la fréquence de mail");
            }
        }
        );
        }
        catch (error) {
            console.log("Erreur au cours du changement de la fréquence de mail"+error.message);
        }
        this.showDialog(false);
    }
    
    render() {
        console.log("dialogue");
        console.log(this.state);
        return(
            <div>
                <Button variant="contained" color="primary" 
                style={{margin: 20}} onClick={this.showDialog(true)}
                disabled={!this.props.state.loaded}
                >
                  <Icon>settings</Icon> Fréquence Mail
                </Button>
                <Dialog open={this.state.open} onClose={this.showDialog(false)}>
                    <DialogTitle><Icon>account_circle</Icon> {this.props.state.firstName} {this.props.state.lastName} </DialogTitle>

                    <DialogContent>
                        <TextField
                        label="Jours entre 2 mails ?"
                        type="number"
                        value={this.state.mailIntensity}
                        onChange={this.selectNumber()}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button color="default">Supprimer l'utilisateur</Button>
                        <Button color="primary" onClick={this.post()}>OK</Button>
                        <Button color="secondary" onClick={this.showDialog(false)} >Annuler</Button>
                    </DialogActions>
                </Dialog>
                
            </div>
        )
    }
}

export default SettingDialog;