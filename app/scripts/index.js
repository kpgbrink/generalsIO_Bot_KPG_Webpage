import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

import PostBox from './Post/PostBox.js';
import PostEdit from './Post/PostEdit.js';

import PostComments from './Post/PostComments.js';

import Catalog from './Catalog/CatalogBox.js';

import MyAccount from './MyAccount/MyAccount.js';

import AppFrame from './AppFrame.js';

import About from './About/About.js';

import '../css/base.css';

const defaultUser = {
    id: null,
    name: null,
    avatarImageUrl: null, // Todo add link to default image :)
}

// https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm

class ContainerComponent extends React.Component {
    render() {
        console.log(this);
        return this.props.children
    }
}

class RouterWrapper {
    constructor() {
        this.state = {
            user: defaultUser,
        };
        // Passing props when using react-router http://stackoverflow.com/a/38907715/2948122
        ReactDOM.render(<Router history={browserHistory}>
                <Route path="/" component={(props) => (<AppFrame onSignIn={this.handleSignIn.bind(this)} onSignOut={this.handleSignOut.bind(this)} user={this.state.user}{...props}/>)}>
                    <IndexRedirect to="/Post"/>
                    <Route path="Post">
                        <Route component={(props) => (<PostBox user={this.state.user}{...props}/>)}>
                            <IndexRoute/>
                        </Route>
                        <Route path=":id">
                            <Route component={(props) => (<PostComments user={this.state.user}{...props}/>)}>
                                <IndexRoute/>
                            </Route>
                            <Route path="edit" component={PostEdit}/>
                        </Route>
                    </Route>
                    <Route path="Catalog" component={Catalog}/>
                    <Route path="About" component={About}/>
                    <Route path="myAccount" component={MyAccount}/>
                </Route>
            </Router>, document.getElementById('content'));
    }

    setState(state) {
        Object.assign(this.state, state);
        // Encourage the router to redraw
        browserHistory.replace(browserHistory.getCurrentLocation());
    }
    handleSignIn(googleUser) {
        this.setState({
            user: {
                id: googleUser.id,
                name: googleUser.name,
                avatarUrl: googleUser.avatarImageUrl
            }
        });
    }
    
    handleSignOut() {
        this.setState({
            user: defaultUser
        });
    }
};
    
new RouterWrapper();
