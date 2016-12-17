import React from 'react';
import $ from 'jquery';

import Post from './Post.js';
import CommentThreads from '../Comments/CommentThreads.js';
import CommentForm from '../Comments/CommentForm.js';

import { API_POSTS } from '../global.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingId: 0,
        };
        this.allowAjaxResponse = true;
    }
    componentDidMount() {
        this.loadPostData();
    }
    componentWillUnmount() {
        this.allowAjaxResponse = false;  
    }
    componentDidUpdate(prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadPostData();
        }
    }
    loadPostData() {
        $.ajax(API_POSTS + "/" + encodeURIComponent(this.props.params.id)) .done(function(post) {
            if (this.allowAjaxResponse) {
                this.setState({post: post}); // does this do it right?
            }
        }.bind(this));
    }
    
    handleCommentSubmit(comment, parentComment) {
        comment.parentCommentId = (parentComment || {})._id;
        comment._id = `prefixId-${this.state.pendingId}`;
        comment.postId = this.state.post._id;
        comment.user = this.props.user;
        comment.comments = [];
        if (parentComment == null) {
            this.state.post.comments.unshift(comment);
        } else {
            parentComment.comments.unshift(comment);
        }
        this.setState({post: this.state.post, pendingId: this.state.pendingId+1});
        $.ajax({
            url: '/api/comments',
            dataType: 'json',
            type: 'POST',
            data: comment,
        })
         .done(function(result){
             this.setState({post: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
            if (parentComment == null) {
                this.state.post.comments.shift();
            } else {
                parentComment.comments.shift();
            }
             console.error('api/comments', status, errorThrown.toString());
             alert('Please Login to Comment');
         }.bind(this));
    }
    
    render() {
        var post = this.state.post;
        console.log(post);
        if (!post) {
            return (<div/>);
        }
        return (
            <div>
                <h1>Post Comments - {this.props.params.id}</h1>
                <Post id={post._id} title={post.title} key={post._id} userName={post.user.name} userAvatarUrl={post.user.avatarUrl} userId={post.userId} user={this.props.user}>
                {post.text}</Post>
                <CommentForm post={post} onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
                <CommentThreads post={post} onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
            </div>
        );
    }
}
