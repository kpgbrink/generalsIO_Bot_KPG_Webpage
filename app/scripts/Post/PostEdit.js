import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import { API_URL } from '../global.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '', text: ''
        };
        this.allowAjaxResponse = true;
    }
    componentDidMount() {
        this.loadData();
    }
    componentWillUnmount() {
        this.allowAjaxResponse = false;  
    }
    componentDidUpdate(prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    }
    loadData() {
        $.ajax(API_URL + "/" + this.props.params.id) .done(function(comments) {
            if (this.allowAjaxResponse) {
                this.setState(comments[0]);
            }
        }.bind(this));
    }
    handleAuthorChange(e) {
        this.setState({author: e.target.value});
    }
    handleTextChange(e) {
        this.setState({text: e.target.value});
    }
    static get contextTypes() {
        return {
            router: React.PropTypes.object,
        };
    }
    handleUpdate() {
        var updatedComment = {
            author: this.state.author.trim(),
            text: this.state.text.trim()
        }
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            dataType: 'json',
            type: 'PUT',
            contentType:'application/json',
            data: JSON.stringify(updatedComment)
        })
         .done(function(comments){
             this.context.router.push('/Post');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    }
    handleDelete() {
        $.ajax({
            url: API_URL + "/" + this.props.params.id,
            type: 'DELETE',
        })
         .done(function(comments){
             this.context.router.push('/Post');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    }
    render() {
        return (
            <div>
                <form className="commentForm">
                    <h1>Comment Edit - {this.props.params.id}</h1>
                    <input
                        type="text"
                        value={this.state.author}
                        onChange={this.handleAuthorChange.bind(this)}
                    />
                    <input
                        type="text"
                        value={this.state.text}
                        onChange={this.handleTextChange.bind(this)}
                    />
                    <button type="button" onClick={this.handleUpdate.bind(this)}>Update</button>
                    <button type="button" onClick={this.handleDelete.bind(this)}>Delete</button>
                </form>
                <Link to='/Post'>Cancel</Link>
            </div>
        );
    }
}
