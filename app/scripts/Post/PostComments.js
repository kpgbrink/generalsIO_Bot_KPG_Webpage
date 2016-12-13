import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

import Post from './Post.js';

import { API_POSTS } from '../global.js';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        $.ajax(API_POSTS + "/" + this.props.params.id) .done(function(post) {
            if (this.allowAjaxResponse) {
                this.setState({post: post});
            }
        }.bind(this));
    }
    render() {
        console.log(this.state.post);
        console.log()
        var post = this.state.post;
        if (!post) {
            return (<div/>);
        }
        return (
            <div>
                    <h1>Post Comments - {this.props.params.id}</h1>
                    <Post id={post._id} title={post.title} key={post._id} userName={post.user.name} userAvatarUrl={post.user.avatarUrl} userId={post.userId} myPost={post.myPost}>
          {post.text}
        </Post>
            </div>
        );
    }
}
