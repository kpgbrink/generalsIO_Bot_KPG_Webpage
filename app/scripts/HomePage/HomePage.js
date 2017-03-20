import React from 'react';
import $ from 'jquery';

import Introduction from './Introduction';
import MainStatistics from './MainStatistics';
import RecordedGameList from './RecordedGameList';

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
  }

  loadData() {
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
      <div className="HomePage">
        <Introduction/>
        <MainStatistics summaryData={this.state.summaryData}/>
        <RecordedGameList gameList={this.state.gameList}/>
      </div>

    );
  }
}
