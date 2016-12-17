import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

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
        if (this.props.user.id == this.props.userId) {
            return (
                <Link to={'/Post/' + this.props.id + '/edit'}>Edit </Link>
            );
        }
    }
    
    renderCommentsLink() {
        // TODO somehow make comments display the amount of comments
        if (this.props.comments) {
            return (
                <Link to={'/Post/' + this.props.id}>Comments</Link>
            );
        }
    }
    
    render() {
        return (
            <div className="post">
                <h2 className="post-title" >
                    {this.props.title}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <div className="post-user">
                    <img className="post-user-avatar-url" src={this.props.userAvatarUrl}/>
                    <p className="post-user-name">
                        {this.props.userName}
                    </p>
                </div>
                <div className="post-links">
                    {this.renderEditLink()}
                    {this.renderCommentsLink()}
                </div>    
            </div>
        );
    }
};
