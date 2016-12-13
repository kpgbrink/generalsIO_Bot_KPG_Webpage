import React from 'react';
import $ from 'jquery';

const Table = require('rc-table');
import Animate from 'rc-animate';

require('rc-table/assets/index.css');
require('rc-table/assets/animation.css');

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: 'Title', dataIndex: 'title', key: 'a', width: 100 },
      { title: 'Author', dataIndex: 'author', key: 'b', width: 100 },
      { title: 'Year', dataIndex: 'year', key: 'c', width: 70 },
      {
        title: 'Operations', dataIndex: '', key: 'd', render: (text, record) =>
        <a onClick={e => this.onDelete(record.key, e)} href="#">Delete</a>,
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

  onAdd() {
    const data = [...this.state.data];
    data.push({
      a: 'Harry Potter',
      b: 'JK Rowling',
      c: '2001',
      key: Date.now(),
    });
    this.setState({ data });
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
        <h2>Book Collection</h2>
        <Table
          columns={this.columns}
          data={this.props.data}
          getBodyWrapper={this.getBodyWrapper}
        />
      </div>
    );
  }
}
