import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';
import TimeAgo from 'react-timeago';
import youtubeUrl from 'youtube-url';
import YouTube from'react-youtube';

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    rawMarkup() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }
    
    renderEditLink() {
        if (this.props.user.id == this.props.post.user._id) {
            return (
                <Link to={'/Post/' + this.props.post._id + '/edit'} className="edit-link">edit </Link>
            );
        }
    }
    
    renderCommentsLink() {
        // TODO somehow make comments display the amount of comments
        if (this.props.comments) {
            return (
                <Link to={'/Post/' + this.props.post._id} className="comments-link">comments</Link>
            );
        }
    }
    
    renderPostUrl() {
        // handle images and gifs
        console.log("url", this.props.post.url);
        if (this.props.post.url) {
            const youtubeId = youtubeUrl.extractId(this.props.post.url);
            if (youtubeId) {
                return (
                    <div className="post-youtube-video">
                        <YouTube videoId={youtubeId}/>
                    </div>
                );
            } else {
                return (
                    <a href={this.props.post.url} target="_blank"><img className="post-image" src={this.props.post.url} alt="link"/></a>
                );
            }
        }
    }
    
    render() {
        return (
            <div className="post">
                <h2 className="post-title" >
                    {this.props.post.title}
                </h2>
                {this.renderPostUrl()}
                <div className="post-text" dangerouslySetInnerHTML={this.rawMarkup()} />
                <div className="post-user">
                    <img className="post-user-avatar-url" src={this.props.post.user.avatarUrl}/>
                    <p className="post-user-name">
                        {this.props.post.user.name}
                    </p>
                </div>
                <TimeAgo date={this.props.post.date}/>
                <div className="post-links">
                    {this.renderEditLink()}
                    {this.renderCommentsLink()}
                </div>    
            </div>
        );
    }
};
