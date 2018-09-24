import React from 'react';
import ErrorBanner from './ErrorBanner';
import decodeToken from './decodeToken';

class Survey extends React.Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {
        console.log(decodeToken(this.props, this.ChangeState));
    }

    ChangeState = (params) => {
        params.forEach( (param) => {
            this.setState({ [param.name]: param.value });
            console.log(param);
            console.log(this.state);
        })
        
        console.log("state :");
        console.log(this.state);
    }

    render () {
        console.log("state render :");
        console.log(this.state);
        this.setState()
        return (
           <ErrorBanner />
        );
    }
}

export default Survey;