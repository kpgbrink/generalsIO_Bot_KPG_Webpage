import React from 'react';

import RecordedGameRow from './RecordedGameRow';

const styles = {
  row: {

  },
  table: {
    textAlign: 'center',
  },
  tableHeader: {

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
      <div className='RecordedgameList'>
        <table style={styles.table}>
          <tbody>
            <tr>
              <th>Outcome</th>
              <th>Enemies</th>
              <th>Defense Radius</th>
              <th>Bozo Frame Count</th>
              <th>Wait time</th>
              <th>Past Indices Max</th>
            </tr>
            {gameRows}
          </tbody>
        </table>
      </div>
    )
  }
}
