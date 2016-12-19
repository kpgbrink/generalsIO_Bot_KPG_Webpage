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
        var date = new Date().toISOString();
        var myPost = true;
        if (!text || !title) {
            return;
        }
        this.props.onPostSubmit({title: title, text: text, date: date, user: this.props.user, myPost: myPost });
        this.setState({title: '', text: ''});
    }
    render() {
        return (
            <form className="post-form" onSubmit={this.handleSubmit.bind(this)}>
                <input className="ui-widget ui-corner-all" type="text" placeholder="title..."
                    value={this.state.title} onChange={this.handleAuthorChange.bind(this)} size="90"
                />
                <br/>
                <textarea className="ui-widget ui-corner-all" type="text" placeholder="post..."
                    value={this.state.text} onChange={this.handleTextChange.bind(this)}
                    cols="91"
                />
                <br/>
                <button className="ui-button ui-widget ui-corner-all post-button">Post</button>
            </form>
        );
    }
};
