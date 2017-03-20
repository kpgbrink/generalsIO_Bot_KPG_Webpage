import React from 'react';
import $ from 'jquery';

import Introduction from './Introduction';
import MainStatistics from './MainStatistics';
import RecordedGameList from './RecordedGameList';

const styles = {
  homePage: {
    backgroundColor: '#f9fffa',
    padding: '20px',
    height: '100%',
  },
  underLine: {
    borderBottom: '2px black solid',
  },
  stats: {
    backgroundColor: '#18f960',
    marginTop: '10px',
    padding: '10px',
  },
};


/*Home Page
*/
export default class HomePage extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        summaryData: {
          gamesPlayed: 0,
          overallWinPercentage: 0,
          last100WinPercentage: 0,
        },
        gameList: [],
    }
  }

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData.bind(this), 10000);
  }

  loadData() {
    console.log('updating data');
    $.ajax({
      url: './export.json',
      dataType: 'json'
    }).then((result) => {
      this.setState({
        summaryData: {
          gamesPlayed: result.summary[0].count,
          overallWinPercentage: result.summary[0].winPercentage,
          last100WinPercentage: result.lastHundredGames.summary.winPercentage,
        },
        gameList: result.lastHundredGames.lastHundred,
      });
    });
  }

  render() {
    return (
      <div style={styles.homePage}>
        <Introduction/>
        <div style={styles.stats}>
          <h2 style={styles.underLine}>Statistics</h2>
          <MainStatistics summaryData={this.state.summaryData}/>
        </div>
        <RecordedGameList gameList={this.state.gameList}/>
      </div>

    );
  }
}
