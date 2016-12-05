import React from "react";

export default class SignOut extends React.Component {
    constructor() {
        super();
        this.signOut = this.signOut.bind(this);
    }
    
    signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then( () => {
            this.props.onSignOut();
            console.log('User signed out.');
        });
    }
    
    static get defaultProps() {
        return {
            onSignOut: () => {},  
        };
    }
    
    
    render() {
        return (
            <a href="#" onClick={this.signOut}>Sign out</a>
        );
    }
}