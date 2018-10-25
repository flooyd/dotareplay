import React, { Component } from 'react';
import Player from './Player.js'
import './css/match.css'

class Match extends Component { 
  getPlayers = () => {
    let players = [];

    this.props.match.matchInfo.players_.forEach((p,i) => {
      let key = `player${i}`;
     
      players.push(
        <Player key={key} player={p} kills={this.props.match.DOTA_COMBATLOG_DEATH} slot={i}/>
      )
    });
    
    return players;
  }
  render() {
    return (
      <div className="match">
        <p className="matchId">
          Match ID: <span className="matchIdNumber">
                     {this.props.match.matchInfo.matchId_}
                    </span>
        </p>
        <div className="players">
          {this.getPlayers()}
        </div>
      </div>
    );
  }
}

export default Match;
