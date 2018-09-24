import React from 'react';
import { Typography, CircularProgress} from '@material-ui/core';

// Fonction pour mettre un effet de chargement :
function Loading(props) {
    return( 
      <div style={{position: 'relative'}}>
    <Typography variant="display1" align="center" color="textPrimary" gutterBottom>
    Chargement du sondage
    </Typography>
    <CircularProgress color="primary" size={300} thickness={7} style={{marginLeft: '30%'}} />
    </div>
    );
  }

export default Loading;