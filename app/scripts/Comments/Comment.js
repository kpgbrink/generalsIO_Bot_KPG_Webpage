import React from 'react';
import Remarkable from 'remarkable';
import CommentForm from './CommentForm.js';
import TimeAgo from 'react-timeago';

/*Comment Component
*
*Displays the user image, name and time along with the comment
*/

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

//Once comment is submitted this displayes the posted response/comment
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
                    <div className="comment-name-and-time">
                        <p className="comment-user-name"> {this.props.comment.user.name}</p>
                        <TimeAgo date={this.props.comment.date}/>
                    </div>
                    <p className="comment-text" dangerouslySetInnerHTML={this.rawMarkup()} />
                    {this.displayResponse()}
                </div>
            </div>
        );
    }
}
