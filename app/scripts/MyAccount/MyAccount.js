import React from 'react';
import ProfileImage from '../User/UserComponents/ProfileImage.js';

export default class extends React.Component{
constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
                console.log(this.state.signedIn);
        return (
            <div className="my-account">
                <ProfileImage profileUrl={this.props.user.avatarUrl}/>
            </div>
            );
    }
}