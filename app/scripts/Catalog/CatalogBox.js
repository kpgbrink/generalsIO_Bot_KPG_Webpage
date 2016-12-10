import React from 'react';
import $ from 'jquery';

const Table = require('rc-table');
import Animate from 'rc-animate';

import CatalogForm from './CatalogBoxComponents/CatalogForm.js';

require('rc-table/assets/index.css');
require('rc-table/assets/animation.css');

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      { title: 'Title', dataIndex: 'a', key: 'a', width: 100 },
      { title: 'Author', dataIndex: 'b', key: 'b', width: 100 },
      { title: 'Year', dataIndex: 'c', key: 'c', width: 100 },
      {
        title: 'Operations', dataIndex: '', key: 'd', render: (text, record) =>
        <a onClick={e => this.onDelete(record.key, e)} href="#">Delete</a>,
      },
    ];
    this.state = {
      data: [
        { a: 'Bible', b: 'King James', key: '1', c: '1905' },
        { a: 'Bla', b: 'Bla', key: '2', c: '5423' },
        { a: 'Testing', b: 'Tester', key: '3', c: '2016' },
      ],
    };
  }

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
        <CatalogForm/>
        <button onClick={() => this.onAdd()}>Books</button>
        <Table
          columns={this.columns}
          data={this.state.data}
          getBodyWrapper={this.getBodyWrapper}
        />
      </div>
    );
  }
}
