import React from 'react';
import CommentForm from './CommentForm.js';
import TimeAgo from 'react-timeago';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCommentForm: false,
        };
    }
    
    displayResponse() {
        console.log("props comment: ", this.props.comment)
        if (this.state.showCommentForm) {
            return (
                <div className="comment-reply">
                    <CommentForm onCommentSubmit={(newComment) => { 
                        this.setState({showCommentForm: false});
                        return this.props.onCommentSubmit(newComment, this.props.comment)
                    }} />
                    <a href='#' onClick={(e) => { e.preventDefault(); this.setState({showCommentForm: false});}}>Cancel</a>
                </div>
            )
        } else {
            return <a href='#' onClick={(e) => { e.preventDefault(); this.setState({showCommentForm: true});}}>Reply</a>
        }
    }
    
    render() {
        return (
            <div className="comment">
                <div className="user-information">
                    <img className="comment-user-image" src={this.props.comment.user.avatarUrl} alt=""/>
                    <p className="comment-user-name"> {this.props.comment.user.name} </p>
                </div>
                <p className="comment-text"> {this.props.comment.text} </p>
                <TimeAgo date={this.props.comment.date}/><br/>
                {this.displayResponse()}
            </div>
        );
    }
}
