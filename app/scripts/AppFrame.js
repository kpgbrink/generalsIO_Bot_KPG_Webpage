import React from 'react';
import { IndexLink, Link} from 'react-router';

/*
*Static Frame that is always present.
*Includes the Header, Footer, and link to other components
*/

const styles = {
  header: {
    backgroundColor: '#cadcf9',
    paddingTop: '20px',
    textAlign: 'center',
    backgroundImage: 'url("./static/images/botLogo.png")',
    backgroundRepeat: 'np-repeat',
    backgroundPosition: 'center',
    backgroundSize: '70px 70px',
  },
  headerTitle: {
    fontWeight: '10000',
    fontFamily: 'courier',
    textShadow: '2px 2px #0ff0ff',
    color: 'black',
    textOutline: 'green',
  },
  heightFill: {
    height: '100%',
  },
  footer: {
    backgroundColor: '#054505',
  }
};

export default class AppFrame extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="AppFrame" style={styles.heightFill}>
        <div className="HeaderTitle" style={styles.header}>
          <h1 className="HeaderTitleText" style={styles.headerTitle}>Octo Weaver</h1>
          <ul className="Header">
            <div className="Links">
              <li><IndexLink to="/" activeClassName="Active">Main</IndexLink></li>
              <li><Link to="/MoreStatistics" activeClassName="Active">Statistics</Link></li>
            </div>
          </ul>
        </div>

        <div className="Content" style={styles.heightFill}>
          {this.props.children}
        </div>
      </div>
    );
  }
};
