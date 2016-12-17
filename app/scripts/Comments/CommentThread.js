import React from 'react';
import $ from 'jquery';
import Comment from './Comment.js';


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return (
            <div className="comment-thread">
                <Comment comment={this.props.comment}/>
                <div>
                    {this.props.comment.comments.map(comment => (<CommentThread key={comment.id} comment={comment} parentComment={this.props.comment}))}
                </div>
            </div>
        );
    }
}
