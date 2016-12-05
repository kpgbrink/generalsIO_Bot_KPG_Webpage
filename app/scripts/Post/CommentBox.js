import React from 'react';
import $ from 'jquery';

import CommentList from './CommentList.js';
import CommentForm from './CommentForm.js';
import {API_URL, POLL_INTERVAL} from '../global.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.allowAjaxResponse = true;
    }
    loadCommentsFromServer() {
        $.ajax({
            url: API_URL,
            dataType: 'json',
            cache: false,
        })
         .done(function(result){
             if (this.allowAjaxResponse) {
                this.setState({data: result});
             }
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(this.props.url, status, errorThrown.toString());
         }.bind(this));
    }
    handleCommentSubmit(comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        $.ajax({
            url: API_URL,
            dataType: 'json',
            type: 'POST',
            data: comment,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: comments});
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    }
    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, POLL_INTERVAL);
    }
    componentWillUnmount() {
        this.allowAjaxResponse = false;
    }
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
            </div>
        );
    }
};