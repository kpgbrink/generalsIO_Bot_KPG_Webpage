import React from 'react';

export default function RecordedGameRow(props) {
  return (
    <tr className='RecordedGameListRow'>
      <td> {props.rowData.outcome}</td>
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
