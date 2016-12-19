import React from 'react';
import $ from 'jquery';

const Table = require('rc-table');
import Animate from 'rc-animate';
import {API_CATALOG} from '../../global.js';

require('rc-table/assets/index.css');
require('rc-table/assets/animation.css');

/*CatalogTable Component
*
*Is contained in CatalogBox, renders the table of records
*/


export default class extends React.Component {
  constructor(props) {
    super(props);
    //Defines the format of the table
    this.columns = [
      { title: 'Catalog', dataIndex: 'catalog', key: 'a', width: 100 },
      { title: 'Title', dataIndex: 'title', key: 'b', width: 100 },
      { title: 'Author', dataIndex: 'author', key: 'c', width: 100 },
      { title: 'Year', dataIndex: 'year', key: 'd', width: 70 },
      {
        title: 'Operations', dataIndex: '', key: 'e', render: (text, record) =>
        <a onClick={e => {
            e.preventDefault();
            this.props.onDelete(record, e)
            }
        } href="#">Delete</a>,
        //<a onClick={e => this.handleDelete(record, e)} href="#">Delete</a>,
      },
    ];
    this.state = {};
	this.allowAjaxResponse = true;
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
        <h2>Media Collection</h2>
        <Table
          columns={this.columns}
          data={this.props.data}
          getBodyWrapper={this.getBodyWrapper}
        />
      </div>
    );
  }
}
