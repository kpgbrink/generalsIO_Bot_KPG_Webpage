import React from 'react';
import TimeAgo from 'react-timeago';

const styles = {
  win: {
    backgroundColor: '#12ff12',
  },
  lose: {
    backgroundColor: '#ff2121',
  },
  row: {
    padding: '20px',
  },
}

export default function RecordedGameRow(props) {
  return (
    <tr style={styles.row}>
      <td style={props.rowData.outcome?styles.win:styles.lose} >
        <a href={'http://bot.generals.io/replays/' + props.rowData.gameStart.replay_id}>
          <b>
            {props.rowData.outcome?'Win':'Lose'}
          </b>
        </a>
      </td>
      <td> {props.rowData.gameStart.usernames.map((u, i) => ({
        username: u,
        index: i,
      })).filter(info => {
        return info.index != props.rowData.gameStart.playerIndex;
      }).map(info => info.username).join(', ')} </td>
      <td> {props.rowData.parameters.homeDefenseRadius} </td>
      <td> {props.rowData.parameters.bozoFrameCountMax} </td>
      <td> {props.rowData.parameters.startWait} </td>
      <td> {props.rowData.parameters.pastIndicesMax} </td>
      <td> <TimeAgo date={props.rowData.endDate} /> </td>
    </tr>
  );
}

/*
<th>Outcome</th>
<th>Enemy</th>
<th>Defense Radius</th>
<th>Bozo Frame Count</th>
<th>Wait time</th>
<th>Past Indices Max</th>
*/
