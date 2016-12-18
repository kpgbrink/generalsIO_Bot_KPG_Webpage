import React from 'react';

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            catalog: '', title: '', author: '', year: ''
        }
    }

    handleCatalogChange(e) {
        this.setState({catalog: e.target.value});
    }
    handleAuthorChange(e) {
        this.setState({title: e.target.value});
    }
    handleTextChange(e) {
        this.setState({author: e.target.value});
    }
    handleYearChange(e) {
        this.setState({year: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        var catalog = this.state.catalog.trim();
        var title = this.state.title.trim();
        var author = this.state.author.trim();
        var year = this.state.year.trim();
        if (!author || !title) {
            return;
        }
        this.props.onPostSubmit({catalog: catalog, title: title, author: author, year: year});
        this.setState({catalog: '', title: '', author: '', year: ''});
    }
    render() {
        return (
            <form className="catalog-form" onSubmit={this.handleSubmit.bind(this)}>
                <select name="ui-widget ui-corner-all" type="text"
                value={this.state.catalog} onChange={this.handleCatalogChange.bind(this)}>
                <option value="Book">Book</option>
                <option value="Movie">Movie</option>
                <option value="Music">Music</option>
                </select>
                <input className="ui-widget ui-corner-all" type="text" placeholder="name..."
                    value={this.state.title} onChange={this.handleAuthorChange.bind(this)}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="author..."
                    value={this.state.author} onChange={this.handleTextChange.bind(this)}
                />
                <input className="ui-widget ui-corner-all" type="text" placeholder="year..."
                    value={this.state.year} onChange={this.handleYearChange.bind(this)}
                />
                <input className="ui-button ui-widget ui-corner-all" type="submit" value="Post" />
            </form>
        );
    }
};
