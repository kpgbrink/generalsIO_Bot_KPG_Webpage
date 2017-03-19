import React from 'react'

/*Main User Component
*Renders SignIn, UserName, SignedOut
*
*/
export default class extends React.Component{
constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="user">
                <p> Hello do you want to talk about this bot ? </p>
            </div>
            );
    }
}
