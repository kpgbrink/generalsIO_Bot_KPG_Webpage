import React from 'react';

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            type: 'text',
            url: '', title: '', text: ''
        }
    }
    handleAuthorChange(e) {
        this.setState({title: e.target.value});
    }
    handleTextChange(e) {
        this.setState({text: e.target.value});
    }
    handleUrlChange(e) {
        this.setState({url: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var text = this.state.text.trim();
        var type = this.state.type.trim();
        var date = new Date().toISOString();
        var myPost = true;
        if (!text || !title) {
            return;
        }
        this.props.onPostSubmit({title: title, text: text, date: date, user: this.props.user, myPost: myPost, type: type });
        this.setState({url: '', title: '', text: ''});
    }
    
    handleTypeChange(e, type) {
        e.preventDefault();
        this.setState({type: type});
    }
    
    displayLinkInput() {
        if (this.state.type == "url") {
            return (
                <div>
                    <input type="url" className="post-link-input" value={this.state.url} onChange={this.handleUrlChange.bind(this)} placeholder="link..."/>
                    <br/>
                </div>
            );
        }
    }
    
    render() {
        return (
            <div>
                <ul>
                    {[{type: 'text', name: 'Text', }, {type: 'url', name: 'Link'} ].map((ob) => 
                        <li key={ob.type}><a href='#' onClick={(e)=>this.handleTypeChange(e, ob.type)}>{ob.name}</a></li>
                     )}
                </ul>
                
                <form className="post-form" onSubmit={this.handleSubmit.bind(this)}>
                    <input className="ui-widget ui-corner-all" type="text" placeholder="title..."
                        value={this.state.title} onChange={this.handleAuthorChange.bind(this)} size="90"
                    />
                    <br/>
                    {this.displayLinkInput()}
                    <textarea className="ui-widget ui-corner-all" type="text" placeholder="post..."
                        value={this.state.text} onChange={this.handleTextChange.bind(this)}
                        cols="91"
                    />
                    <br/>
                    <button className="ui-button ui-widget ui-corner-all post-button">Post</button>
                </form>
            </div>
        );
    }
};
