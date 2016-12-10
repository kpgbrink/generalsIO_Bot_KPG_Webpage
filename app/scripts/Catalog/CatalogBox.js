import React from 'react';
import $ from 'jquery';

const Table = require('rc-table');
import Animate from 'rc-animate';

import CatalogTable from './CatalogBoxComponents/CatalogTable.js';
import CatalogForm from './CatalogBoxComponents/CatalogForm.js';

require('rc-table/assets/index.css');
require('rc-table/assets/animation.css');

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ margin: 20 }}>
        <h2>Add A Book...</h2>
        <CatalogForm/>
        <CatalogTable/>
      </div>
    );
  }
}
