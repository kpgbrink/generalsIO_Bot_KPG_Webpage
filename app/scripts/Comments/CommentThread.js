import React from 'react';
import $ from 'jquery';
import Comment from './Comment.js';

/*CommentThread Component
*This renders the one commentThread 
*
*/

export default class CommentThread extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var commentThread = this.props.comment.comments.map((comment) => {
            return (
                <CommentThread key={comment._id} comment={comment} parentComment={this.props.comment} onCommentSubmit={this.props.onCommentSubmit}/>
            )
        })

        return (
            <div className="comment-thread">
                <Comment comment={this.props.comment} onCommentSubmit={this.props.onCommentSubmit}/>
                <div>
                    {commentThread}
                </div>
            </div>
        );
    }
}
