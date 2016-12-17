import React from 'react';
import CommentForm from './CommentForm.js';


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCommentForm: false,
        };
    }
    
    
    displayResponse() {
        if (this.state.showCommentForm) {
            return (
                <div className="comment-reply">
                    <CommentForm onCommentSubmit={(newComment) => this.props.onCommentSubmit(newComment, this.props.comment)} />
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
                <img src={this.props.comment.user.avatarUrl} alt=""/>
                <p className="comment-user-name"> {this.props.comment.user.name} </p>
                <p className="comment-text"> {this.props.comment.text} </p>
                {this.displayResponse()}
            </div>
        );
    }
}
