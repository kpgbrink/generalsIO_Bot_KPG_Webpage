import React from 'react';


export default class extends React.Component{
constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
                console.log(this.state.signedIn);
        return (
            <div className="MyAccount">
                <p> This is my account </p>
            </div>
            );
    }
}