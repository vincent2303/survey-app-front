import React from 'react';
import ErrorBanner from './ErrorBanner';
import decodeToken from './decodeToken';
import Loading from './Loading';
import queryingData from './queryingData';
import { Typography } from '@material-ui/core';

class Survey extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loaded: false, error: false};
    }

    componentDidMount() {
        if (decodeToken(this.props, this.changeState, this.serverQuery)) {
            console.log("quering data");
            //TODO: faire transiter l'url depuis le parent !!

        }
    }

    changeState = (params, next) => {
        // Si  la variable next n'est pas définie, elle est une fonction nulle
        next = (typeof next === 'undefined') ? () => {} : next;
        this.setState( () => {
            return (params)
        }, next);
        this.forceUpdate();
    }

    serverQuery = () => {
        queryingData(this.state, this.changeState);
    }

    render () {
        console.log("state render :");
        console.log(this.state);
        
        let display;

        // Si il y a eu une erreur le message d'entête affiche l'erreur, sinon, on affiche le nom de l'utilisateur
        if(this.state.error){
            display = <ErrorBanner message={this.state.errorMessage}/>;
        } 
        // Si les données n'ont pas encore été récupérées, on affiche loading
        else if(!this.state.loaded) {
            display = <Loading />;
        }
        else {
            display = <Typography variant="display3" align="center" color="textPrimary" gutterBottom> Bonjour {this.state.firstName} </Typography>
        }
        return (
           display
        );
    }
}

export default Survey;