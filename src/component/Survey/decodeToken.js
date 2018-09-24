import jwt from 'jsonwebtoken';

const decodeToken = function(props, changeState, serverQuery) {


    // Verifie si l'url contient un token ou non
    if (props.location.search === ''){
        // L'état du composant est mis à joue si il n'y a pas de token
        //initialState({name: "errorMessage", value: "Votre Lien est incorrect ! Veuillez utiliser le lien que vous avez reçu par mail !"});
        changeState({error: true, errorMessage: "Votre Lien est incorrect ! Veuillez utiliser le lien que vous avez reçu par mail !"});
        return false;
      } else {
        var replacedSymbols = '/[/./+/*]/g';
        let token = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape("token").replace(replacedSymbols, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        let decoded = jwt.verify(token, "mon secret");
        // Ajoute les informations récupérées à l'état du component survey
        changeState({ token: token});
        // Dès que l'état est bien changé, on lance la requète au serveur !
        changeState(decoded, () => {serverQuery();});
        return true;
      }
    
}

export default decodeToken;