import React from 'react';

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            author: '', text: ''
        }
    }
    handleAuthorChange(e) {
        this.setState({author: e.target.value});
    }
    handleTextChange(e) {
        this.setState({text: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!text || !author) {
            return;
        }
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: '', text: ''});
    }
    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input className="ui-widget ui-corner-all" type="text" placeholder="name..."
                    value={this.state.author} onChange={this.handleAuthorChange.bind(this)}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="comment..."
                    value={this.state.text} onChange={this.handleTextChange.bind(this)}
                />
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
};