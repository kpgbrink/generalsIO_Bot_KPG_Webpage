import React from "react";

const DEFAULT_PROFILE_IMAGE_URL = "/images/defaultProfilePic.png";

export default class ProfileImage extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <img className="profile-image" src={this.props.profileUrl || DEFAULT_PROFILE_IMAGE_URL} alt="Profile Image"/>
        );
    }
}