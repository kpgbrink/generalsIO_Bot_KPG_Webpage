import React from 'react';
import ProfileImage from '../User/UserComponents/ProfileImage.js';
import PostBox from '../Post/PostBox.js';

export default class extends React.Component{
constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
                console.log(this.state.signedIn);
        return (
            <div>
                <div className="my-account">
                    <ProfileImage profileUrl={this.props.user.avatarUrl}/>
                    <h1>{this.props.user.name}</h1>
                </div>
                <PostBox user={this.props.user} userFilter={this.props.user.id}/>
            </div>
            );
    }
}