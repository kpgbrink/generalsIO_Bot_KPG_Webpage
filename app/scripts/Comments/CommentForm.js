import React from 'react';
import CommentTextField from './CommentTextField.js';

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    handleTextChange(e) {
        this.setState({text: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        var text = this.state.text.trim();
        if (!text) {
            return;
        }
        this.props.onCommentSubmit({text: text }, null);
        this.setState({text: ''});
    }
    render() {
        return (
            <form className="comment-form" onSubmit={this.handleSubmit.bind(this)}>
                <CommentTextField text={this.state.text} onChange={this.handleTextChange.bind(this)}/>
                <button className="ui-button ui-widget ui-corner-all" type="submit">Comment</button>
            </form>
        );
    }
};
