import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';

import PostBox from './Post/PostBox.js';
import PostEdit from './Post/PostEdit.js';

import PostComments from './Post/PostComments.js';

import Catalog from './Catalog/CatalogBox.js';

import MyAccount from './MyAccount/MyAccount.js';

import AppFrame from './AppFrame.js';

import '../css/base.css';


// https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={AppFrame}>
            <Route path="Post">
                <Route component={PostBox}>
                    <IndexRoute/>
                </Route>
                <Route path=":id">
                    <Route component={PostComments}>
                        <IndexRoute/>
                    </Route>
                    <Route path="edit" component={PostEdit}/>
                </Route>
            </Route>
            <Route path="Catalog" component={Catalog}/>
            <Route path="myAccount" component={MyAccount}/>
        </Route>
    </Router>
), document.getElementById('content'));
