import React from 'react';
import $ from 'jquery';
import Comment from './Comment.js';


export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
  render() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment id={String(comment._id)} author={comment.author} key={comment._id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
};
