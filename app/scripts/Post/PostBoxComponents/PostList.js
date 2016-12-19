import React from 'react';
import $ from 'jquery';
import Post from '../Post.js';


export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
  render() {
    var postNodes = this.props.data.map((post) => {
      return (
        <Post key={post._id} post={post} user={this.props.user} comments={true}>
          {post.text}
        </Post>
      );
    });
    return (
      <div className="post-list">
        {postNodes}
      </div>
    );
  }
};
