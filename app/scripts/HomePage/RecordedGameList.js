import React from 'react';

import RecordedGameRow from './RecordedGameRow';
/*Home Page
*/
export default class RecordedGameList extends React.Component{
  constructor(props) {
      super(props);
  }

  render() {
    let gameRows = this.props.gameList.map((row) => {
      return (
        <RecordedGameRow key={row.replay_id} rowData={row} />
      );
    });
    return (
      <div className='RecordedgameList'>
        <table>
          <tbody>
            <tr>
              <th>Hey</th>
              <th>Yo</th>
              <th>no</th>
            </tr>
            {gameRows}
          </tbody>
        </table>
      </div>
    )
  }
}
