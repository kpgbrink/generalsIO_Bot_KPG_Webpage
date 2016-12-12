import React from 'react';
import $ from 'jquery';
import Post from './PostListComponents/Post.js';


export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
  render() {
    var postNodes = this.props.data.map(function(post) {
      return (
        <Post id={post._id} title={post.title} key={post._id} userName={post.user.name} userAvatarUrl={post.user.avatarUrl} userId={post.userId} myPost={post.myPost}>
          {post.text}
        </Post>
      );
    });
    return (
      <div className="postList">
        {postNodes}
      </div>
    );
  }
};
