import React from 'react';

import RecordedGameRow from './RecordedGameRow';

const styles = {
  table: {
    textAlign: 'center',
    margin: '20px',
    border: '3px black solid'
  },
  tableHeader: {
    textAlign: 'center',
    padding: '10px',
    color: '#124323',
    border: '2px black solid',
  },
  RecordedGameList: {
    backgroundColor: '#542054',
  }
};


/*Home Page
*/
export default class RecordedGameList extends React.Component{
  constructor(props) {
      super(props);
  }

  render() {
    let gameRows = this.props.gameList.map((row) => {
      return (
        <RecordedGameRow key={row.gameStart.replay_id} rowData={row} />
      );
    });
    return (
      <div className='RecordedgameList' style={styles.RecordedgameList}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <th style={styles.tableHeader}>Outcome</th>
              <th style={styles.tableHeader}>Enemies</th>
              <th style={styles.tableHeader}>Defense Radius</th>
              <th style={styles.tableHeader}>Bozo Frame Count</th>
              <th style={styles.tableHeader}>Wait time</th>
              <th style={styles.tableHeader}>Past Indices Max</th>
              <th style={styles.tableHeader}>Time Ago</th>
            </tr>
            {gameRows}
          </tbody>
        </table>
      </div>
    )
  }
}
