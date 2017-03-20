import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, IndexRoute, IndexRedirect } from 'react-router';

import HomePage from './HomePage/HomePage';
import MoreStatistics from './MoreStatistics/MoreStatistics';

import AppFrame from './AppFrame';

import '../css/base.css';


// https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm

ReactDOM.render(
  <Router history={browserHistory}>
      <Route path="/" component={AppFrame}>
          <IndexRoute component={HomePage}/>
          <Route path="MoreStatistics" component={MoreStatistics}/>
      </Route>
  </Router>,
  document.getElementById('Content'));
