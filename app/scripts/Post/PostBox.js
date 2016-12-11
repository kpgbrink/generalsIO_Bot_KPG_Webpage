import React from 'react';
import $ from 'jquery';

import PostList from './PostBoxComponents/PostList.js';
import PostForm from './PostBoxComponents/PostForm.js';
import {API_POSTS} from '../global.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pendingId: 0
        };
        this.allowAjaxResponse = true;
    }
    loadPostsFromServer() {
        $.ajax({
            url: API_POSTS,
            dataType: 'json'
        })
         .done(function(result){
             if (this.allowAjaxResponse) {
                this.setState({data: result});
             }
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_POSTS, status, errorThrown.toString());
         }.bind(this));
    }
    handlePostSubmit(post) {
        var posts = this.state.data;
        post._id = `prefixId-${this.state.pendingId}`;
        var newPosts = [post].concat(posts);
        this.setState({data: newPosts, pendingId: this.state.pendingId+1});
        $.ajax({
            url: API_POSTS,
            dataType: 'json',
            type: 'POST',
            data: post,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: posts});
             console.error(API_POSTS, status, errorThrown.toString());
         }.bind(this));
    }
    componentDidMount() {
        this.loadPostsFromServer();
        // No more interval
        //setInterval(this.loadCommentsFromServer, POLL_INTERVAL);
    }
    componentWillUnmount() {
        this.allowAjaxResponse = false;
    }
    render() {
        return (
            <div className="postBox">
                <h1>Posts</h1>
                <PostForm onPostSubmit={this.handlePostSubmit.bind(this)} />
                <PostList data={this.state.data} />
            </div>
        );
    }
};
