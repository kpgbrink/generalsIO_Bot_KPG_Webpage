import React from "react";
import gapi from "gapi";
import $ from "jquery";

/*Sign Out Component
*Displayed when a user succsfully signs out.
*
*/

export default class SignOut extends React.Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    //Update the database that the user has signed out
    signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then( () => {
            console.log('User signed out.');
            $.ajax({
                url:'/api/logout',
                type: 'POST',
            }).done(function(result) {
                this.props.onSignOut();
                console.log("SUCCESFULLLY LOGGED OUT");

                this.props.onSignOut();

            }.bind(this))
            .fail(function(xhr, status, errorThrown) {
                console.log("THIS FAILED");
                console.error('api/logout', status, errorThrown.toString());
            })
        });
    }

    static get defaultProps() {
        return {
            onSignOut: () => {},
        };
    }


    render() {
        return (
            <a href="#" onClick={this.signOut}>Sign Out</a>
        );
    }
}
