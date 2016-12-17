import React from 'react';
import CommentThread from './CommentThread.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        var post = this.props.post;
        if (!post) {
            console.log("post does not exist");
            return (<div/>);
        }
        console.log(post.comments);
        var commentThreads = post.comments.map((comment) => {
            return (
                <CommentThread comment={comment} key={comment._id} onCommentSubmit={this.props.onCommentSubmit}/>
            );
        });
        return (
            <div className="comment-threads">
                {commentThreads}
            </div>
        );
    }
}
