import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
                <p>These are the comments</p>
            </div>
        );
    }
}
