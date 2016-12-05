import React from "react";

export default class ProfileImage extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <img className="profile-image" src={this.props.profileUrl} alt="Profile Image"/>
        );
    }
}