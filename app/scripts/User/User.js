import React from 'react';

import ProfileImage from "./UserComponents/ProfileImage";
import SignIn from "./UserComponents/SignIn";
import SignOut from "./UserComponents/SignOut";

// Todo. Make this point to a real image.
const defaultProfileUrl = "images/profile/defaultProfilePic.png";
const defaultUserName = "User Name";
const defaultSignedIn = false;

export default class extends React.Component{
constructor() {
        super();
        this.state = {
            profileUrl: defaultProfileUrl,
            userName: defaultUserName,
            signedIn: defaultSignedIn,
        }
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }
    
    handleSignIn(googleUser) {
        let profile = googleUser.getBasicProfile();
        this.setState({
            profileUrl: profile.getImageUrl(),
            userName: profile.getName(),
            signedIn: true,
        });
    }
    
    handleSignOut() {
        this.setState({
            profileUrl: defaultProfileUrl,
            userName: defaultUserName,
            signedIn: defaultSignedIn,
        });
    }
    
    renderSignOut() {
        console.log('ruruun');
        if (this.state.signedIn) {
            console.log("this is actually doing something");
            return (
                <SignOut className="signOut" onSignOut={this.handleSignOut.bind(this)}/>
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
                <ProfileImage className="userProfileImage" profileUrl={this.state.profileUrl}/>
                <SignIn onSignIn={this.handleSignIn}/>
                <h2 className="userName">{this.state.userName}</h2>
                {this.renderSignOut()}
            </div>
            );
    }
}