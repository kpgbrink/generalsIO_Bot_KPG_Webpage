import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';

import CommentBox from './Post/PostBox.js';
import CommentEdit from './Post/PostEdit.js';

import Catalog from './Catalog/CatalogBox.js';

import User from './User/User.js';

import AppFrame from './AppFrame.js';

import '../css/base.css';


// https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={AppFrame}>
            <Route path="Post">
                <Route component={CommentBox}>
                    <IndexRoute/>
                </Route>
                <Route path=":id" component={CommentEdit}/>
            </Route>
            <Route path="Catalog" component={Catalog}/>
            <Route path="User" component={User}/>
        </Route>
    </Router>
), document.getElementById('content'));
