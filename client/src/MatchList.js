import React, { Component } from 'react';
import Match from './Match.js';
import util from './util/index.js';
import './css/matchList.css';

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    }
  }
  
  componentDidMount = async () => {
    let response = await fetch('http://localhost:3000/api');
    let match = await response.json();
    util.setMatch(match);
    util.setLast10Intervals();
    console.log(match);
    this.updateMatches(match);
  }

  updateMatches = match => {
    let matchString = <Match key={match.matchInfo.matchId_} match={match}/>
    this.setState({
      matches: [...this.state.matches, matchString]
    });
  }

  render() {
    return (
      <div className="matchList">
        {this.state.matches}
      </div>
    );
  }
}

export default MatchList;
