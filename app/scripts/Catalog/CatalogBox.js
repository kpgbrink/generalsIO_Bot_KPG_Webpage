import React from 'react';
import $ from 'jquery';

const Table = require('rc-table');
import Animate from 'rc-animate';

import CatalogTable from './CatalogBoxComponents/CatalogTable.js';
import CatalogForm from './CatalogBoxComponents/CatalogForm.js';
import {API_CATALOG} from '../global.js';

require('rc-table/assets/index.css');
require('rc-table/assets/animation.css');

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pendingId: 0
        };
        this.allowAjaxResponse = true;
    }
    loadPostsFromServer() {
        $.ajax({
            url: API_CATALOG,
            dataType: 'json'
        })
         .done(function(result){
             if (this.allowAjaxResponse) {
                this.setState({data: result});
             }
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(this.props.url, status, errorThrown.toString());
         }.bind(this));
    }

    handleDelete() {
        $.ajax({
            url: API_POSTS + "/" + this.props.params.id,
            type: 'DELETE',
        })
         .done(function(post){
             this.context.router.push('/Post');
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             console.error(API_POSTS, status, errorThrown.toString());
         }.bind(this));
    }

    handlePostSubmit(post) {
        var posts = this.state.data;
        post._id = `prefixId-${this.state.pendingId}`;
        var newPosts = [post].concat(posts);
        console.log("new catalog: ", post);
        this.setState({data: newPosts, pendingId: this.state.pendingId+1});
        $.ajax({
            url: API_CATALOG,
            dataType: 'json',
            type: 'POST',
            data: post,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: posts});
             console.error(API_CATALOG, status, errorThrown.toString());
             alert('Please Login');
         }.bind(this));
    }
    componentDidMount() {
        this.loadPostsFromServer();
        // No more interval
        //setInterval(this.loadCommentsFromServer, POLL_INTERVAL);
    }
    componentWillUnmount() {
        this.allowAjaxResponse = false;
    }

  render() {
    return (
      <div style={{ margin: 20 }}>
        <h2>Add A Record To A Collection…</h2>
        <CatalogForm onPostSubmit={this.handlePostSubmit.bind(this)}/>
        <CatalogTable data={this.state.data}/>
      </div>
    );
  }
}
