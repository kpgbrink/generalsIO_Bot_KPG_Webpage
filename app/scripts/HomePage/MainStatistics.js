import React from 'react';

export default function MainStatistics(props) {
  return (
    <div className='MainStatistics'>
      <p> Games played: {props.summaryData.gamePlayed} </p>
      <p> Over all win percentage: {props.summaryData.overallWinPercentage} </p>
      <p> Last 100 games win percentage: {props.summaryData.last100WinPercentage} </p>
    </div>
  );
}
