import React from 'react';
import $ from 'jquery';

const Table = require('rc-table');
import Animate from 'rc-animate';
import {API_CATALOG} from '../../global.js';

require('rc-table/assets/index.css');
require('rc-table/assets/animation.css');

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: 'Catalog', dataIndex: 'catalog', key: 'a', width: 200 },
      { title: 'Title', dataIndex: 'title', key: 'b', width: 100 },
      { title: 'Author', dataIndex: 'author', key: 'c', width: 100 },
      { title: 'Year', dataIndex: 'year', key: 'd', width: 70 },
      {
        title: 'Operations', dataIndex: '', key: 'e', render: (text, record) =>
        <a onClick={e => this.onDelete(record.key, e)} href="#">Delete</a>,
        //<a onClick={this.handleDelete.bind(this)} href="#">Delete</a>,
      },
    ];
    this.state = {};
	this.allowAjaxResponse = true;
  }

//To Do: Fix This
  onDelete(key, e) {
    console.log('Delete', key);
    e.preventDefault();
    const data = this.state.data.filter(item => item.key !== key);
    this.setState({ data });
  }

//Getting an error saying ID is unknown when trying to do a handleDelete
  handleDelete() {
      $.ajax({
          url: API_CATALOG + "/" + this.props.params.id,
          type: 'DELETE',
      })
       .done(function(post){
           this.context.router.push('/Post');
       }.bind(this))
       .fail(function(xhr, status, errorThrown) {
           console.error(API_CATALOG, status, errorThrown.toString());
       }.bind(this));
  }

  getBodyWrapper(body) {
    return (
      <Animate transitionName="move" component="tbody" className={body.props.className}>
        {body.props.children}
      </Animate>
    );
  }

  render() {
    return (
      <div style={{ margin: 20 }}>
        <h2>Movie Collection</h2>
        <Table
          columns={this.columns}
          data={this.props.data}
          getBodyWrapper={this.getBodyWrapper}
        />
      </div>
    );
  }
}
