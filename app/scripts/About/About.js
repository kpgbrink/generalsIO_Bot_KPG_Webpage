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
            <div className="about-page">
                <p> This is the about page </p>
            </div>
            );
    }
}