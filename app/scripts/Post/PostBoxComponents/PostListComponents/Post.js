import React from 'react';
import Remarkable from 'remarkable';
import { Link } from 'react-router';

export default class extends React.Component{
    constructor() {
        super();
        this.state = {};
    }
    rawMarkup() {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div className="post">
                <h2 className="postTitle" >
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
		<Link to={'/Post/' + this.props.id}>Edit</Link>
            </div>
        );
    }
};
