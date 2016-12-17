import React from 'react';

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '', text: ''
        }
    }
    handleAuthorChange(e) {
        this.setState({title: e.target.value});
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
                <input className="ui-widget ui-corner-all" type="text" placeholder="comment..."
                    value={this.state.text} onChange={this.handleTextChange.bind(this)}
                />
                <button className="ui-button ui-widget ui-corner-all" type="submit">Comment</button>
            </form>
        );
    }
};
