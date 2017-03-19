import React from 'react';
import { IndexLink, Link} from 'react-router';

/*
*Static Frame that is always present.
*Includes the Header, Footer, and link to other components
*/

export default class extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log('rendering AppFrame')
    return (
      <div className="app-frame">
        <div className="header-title">
          <h2 className="header-title-text">Media React</h2>
        </div>
        <ul className="header">
          <div className="links">
            <li><IndexLink to="/" activeClassName="active">Main</IndexLink></li>
            <li><Link to="/MoreStatistics" activeClassName="active">Statistics</Link></li>
          </div>
        </ul>
        <div className="content">
        {this.props.children}
      </div>
        <div className="footer"/>
      </div>
    );
  }
};
