import React from 'react';
import $ from 'jquery';

import PostList from './PostBoxComponents/PostList.js';
import PostForm from './PostBoxComponents/PostForm.js';
import {API_POSTS} from '../global.js';

/*PostBox Component
*Main Component housing PostList
*
*/

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pendingId: 0
        };
        this.allowAjaxResponse = true;
    }

    //Grabs the posts from the server
    loadPostsFromServer() {
        $.ajax({
            url: API_POSTS,
            dataType: 'json',
            data: {userFilter: this.props.userFilter}
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

    //Method to post to the database with new post
    handlePostSubmit(post) {
        var posts = this.state.data;
        post._id = `prefixId-${this.state.pendingId}`;
        console.log("Is my post true!!!!!!!!!!!!!!!!!!!!!!!!! " + post.myPost);
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
             alert('Please Login to Post');
         }.bind(this));
    }

    //When rendered grabs all posts from the server
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
            <div className="post-box">
            {!this.props.userFilter && <PostForm onPostSubmit={this.handlePostSubmit.bind(this)} user={this.props.user}/>}
                <PostList data={this.state.data} user={this.props.user}/>
            </div>
        );
    }
};
