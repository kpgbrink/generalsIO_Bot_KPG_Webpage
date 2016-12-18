import React from 'react';
import Remarkable from 'remarkable';
import CommentForm from './CommentForm.js';
import TimeAgo from 'react-timeago';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCommentForm: false,
        };
    }
    
    rawMarkup() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.comment.text.toString());
        return { __html: rawMarkup };
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
                <img className="comment-user-image" src={this.props.comment.user.avatarUrl} alt=""/>
                <div className="comment-no-image">
                    <p className="comment-user-name"> {this.props.comment.user.name} </p>
                    <p className="comment-text" dangerouslySetInnerHTML={this.rawMarkup()} />
                    <TimeAgo date={this.props.comment.date}/><br/>
                    {this.displayResponse()}
                </div>
            </div>
        );
    }
}
