import jwt from 'jsonwebtoken';

const decodeToken = function(props, ChangeState) {

    let decoded;

    // Verifie si l'url contient un token ou non
    if (props.location.search === ''){
        // L'état du composant est mis à joue si il n'y a pas de token
        //initialState({name: "errorMessage", value: "Votre Lien est incorrect ! Veuillez utiliser le lien que vous avez reçu par mail !"});
        ChangeState([{name: "error", value: true},
                      {name: "errorMessage", value: "Votre Lien est incorrect ! Veuillez utiliser le lien que vous avez reçu par mail !"}]);
        return false;
      } else {
        var replacedSymbols = '/[/./+/*]/g';
        let token = unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape("token").replace(replacedSymbols, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        decoded = jwt.verify(token, "mon secret");
        console.log(decoded);
        
        return true;
      }
    
}

export default decodeToken;