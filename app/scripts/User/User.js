import React from 'react';

import ProfileImage from "./UserComponents/ProfileImage";
import SignIn from "./UserComponents/SignIn";
import SignOut from "./UserComponents/SignOut";

/*Main User Component
*Renders SignIn, UserName, SignedOut
*
*/


export default class extends React.Component{
constructor(props) {
        super(props);
        this.state = {
        }
    }

    //Display SignIn info
    renderSignIn() {
        if (this.props.user.id == null) {
            return (
                <SignIn onSignIn={this.props.onSignIn}/>
            );
        }
    }

    //Display the username
    renderUserName() {
        if (this.props.user.name) {
            return (
                <h2 className="user-name">{this.props.user.name}</h2>
            );
        }
    }

    //Display signed out
    renderSignOut() {
        // Only render signOut if logged in
        if (this.props.user.id) {
            console.log("this is actually doing something");
            return (
                <SignOut className="signOut" onSignOut={this.props.onSignOut}/>
            );
        } else {
            return (
                <p>Please Sign In</p>
            );
        }
    }

    render() {
        console.log(this.state.signedIn);
        return (
            <div className="user">
                <ProfileImage className="user-profile-image" profileUrl={this.props.user.avatarUrl}/>
                <div className="user-info">
                    {this.renderSignIn()}
                    {this.renderUserName()}
                    {this.renderSignOut()}
                </div>
            </div>
            );
    }
}
