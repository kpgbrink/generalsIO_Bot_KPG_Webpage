import React from 'react';
import User from './User/User.js';
import { IndexLink, Link} from 'react-router';

/*
*Static Frame that is always present.
*Includes the Header, Footer, and link to other components
*/

export default class extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        console.log('rendering AppFrame')
        return (
            <div className="app-frame">
                <div>
                    <div className="header-title">
                        <h2 className="header-title-text">Media React</h2>
                    </div>
                    <ul className="header">
                        <div className="header-left">
                            <img className="media-react-image" alt="Media React" src="/images/mediaReact.png"/>
                            <div className="links">
                                <li><IndexLink to="/Post" activeClassName="active">Post</IndexLink></li>
                                <li><Link to="/Catalog" activeClassName="active">Catalog</Link></li>
                                <li><Link to="/About" activeClassName="active">About</Link></li>
                                <li><Link to="/MyAccount" activeClassName="active">My Account</Link></li>
                            </div>
                        </div>
                        <User onSignIn={this.props.onSignIn} onSignOut={this.props.onSignOut} user={this.props.user}/>
                    </ul>
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
                <div className="footer"/>
            </div>
        );
    }
};
