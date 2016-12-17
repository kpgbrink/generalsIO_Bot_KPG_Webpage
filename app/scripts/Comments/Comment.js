import React from 'react';


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return (
            <div className="comment">
                <img src={this.props.comment.user.avatarUrl} alt=""/>
                <p className="comment-user-name"> {this.props.comment.user.name} <p/>
                <p className="comment-text"> {this.props.comment.text} <p/>
            </div>
        );
    }
}
