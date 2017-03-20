import React from 'react';

const styles = {
  main: {
    padding: '10px',
  }
};

export default function MainStatistics(props) {
  return (
    <div style={styles.main}>
      <p> <b>Games played: </b> {props.summaryData.gamesPlayed} </p>
      <p> <b>Overall win percentage: </b>
        {new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(props.summaryData.overallWinPercentage * 100)}%
      </p>
      <p> <b>Last 100 games win percentage: </b>
        {new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(props.summaryData.last100WinPercentage * 100)}%
      </p>
    </div>
  );
}
