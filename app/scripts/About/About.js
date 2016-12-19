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
                <h1>Media Catalog</h1>
<br></br>
    <h3>Media Catalog is a web application that caters towards users that want
    a centralized place to store records of their music, books or movies.
    Not only that, but it is also a hub to post comments about media and have
    discussions with others. We have utlized google logins so that users can
    distinguish who posted what and have private catalogs.</h3>
<br></br>
<h4>It was created by Kristofer Brink and Trevor Edewaard for their web development class at Calvin College.</h4>
            </div>
            );
    }
}
