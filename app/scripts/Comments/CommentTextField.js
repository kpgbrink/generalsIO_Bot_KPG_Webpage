import React from 'react';

/*CommentTextField Component
*
*Returns the text field to leave a comment
*/

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            hasBeenFocused: false
        }
    }


    handleRef(input) {
        if (input && !this.state.hasBeenFocused) {
            input.focus();
            this.setState({
                hasBeenFocused: true
            });
        }
    }

    render() {
        return (
                <textarea ref={this.handleRef.bind(this)} className="ui-widget ui-corner-all" type="text" placeholder="comment..."
                    value={this.props.text} onChange={this.props.onChange}
                />
        );
    }
};
