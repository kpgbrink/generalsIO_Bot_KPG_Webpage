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
        var title = this.state.title.trim();
        var text = this.state.text.trim();
        var userName = window.userName;
        var userAvatarUrl = window.userAvatarUrl;
        if (!text || !title) {
            return;
        }
        this.props.onPostSubmit({title: title, text: text, user: {name: userName, avatarUrl: userAvatarUrl} });
        this.setState({title: '', text: ''});
    }
    render() {
        return (
            <form className="postForm" onSubmit={this.handleSubmit.bind(this)}>
                <input className="ui-widget ui-corner-all" type="text" placeholder="name..."
                    value={this.state.title} onChange={this.handleAuthorChange.bind(this)}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="post..."
                    value={this.state.text} onChange={this.handleTextChange.bind(this)}
                />
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
};