import React, { Component } from 'react';
import Player from './Player.js'
import './css/match.css'

class Match extends Component { 
  getPlayers = dire => {
    let teamPlayers = [];
    let players = this.props.match.matchInfo.players_;
    let i = 0;
    let length = 5;

    if(dire) {
      i = 5;
      length = 10;
    }

  for(i; i < length; i++) {
      let key = `player${i}`;
     
      teamPlayers.push(
        <Player key={key} player={players[i]} slot={i}/>
      )
    }
    
    return teamPlayers;
  }
  render() {
    return (
      <div className="match">
        <p className="matchId">
          Match ID: <span className="matchIdNumber">
                     {this.props.match.matchInfo.matchId_}
                    </span>
        </p>
        <div className="scoreHeader">
          <p>K</p>
          <p>D</p>
          <p>A</p>
          <p>Gold</p>
        </div>
        <div>
        <p className="radiant">The Radiant</p>
        {this.getPlayers()}
        <p className="dire">The Dire</p>
        {this.getPlayers(true)}
        </div>
        
      </div>
    );
  }
}

export default Match;
