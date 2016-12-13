import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import { API_POSTS } from '../global.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '', text: ''
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
        $.ajax(API_POSTS + "/" + encodeURIComponent(this.props.params.id)).done(function(post) {
            if (this.allowAjaxResponse) {
                this.setState(post);
            }
        }.bind(this));
    }
    handleAuthorChange(e) {
        this.setState({title: e.target.value});
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
        var updatedPost = {
            title: this.state.title.trim(),
            text: this.state.text.trim()
        }
        $.ajax({
            url: API_POSTS + "/" + encodeURIComponent(this.props.params.id),
            dataType: 'json',
            type: 'PUT',
            contentType:'application/json',
            data: JSON.stringify(updatedPost)
        })
         .done(function(post){
             this.context.router.push('/Post');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_POSTS, status, errorThrown.toString());
         }.bind(this));
    }
    handleDelete() {
        $.ajax({
            url: API_POSTS + "/" + this.props.params.id,
            type: 'DELETE',
        })
         .done(function(post){
             this.context.router.push('/Post');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_POSTS, status, errorThrown.toString());
         }.bind(this));
    }
    render() {
        return (
            <div>
                <form className="postForm">
                    <h1>Post Edit - {this.props.params.id}</h1>
                    <input
                        type="text"
                        value={this.state.title}
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
