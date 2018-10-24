import React, { Component } from 'react';
import Player from './Player.js'
import './css/match.css'

class Match extends Component {
  getPlayers = () => {
    let players = [];

    this.props.match.matchInfo.players_.forEach((p,i) => {
      let hero = p.heroName_;
      let key = `player${i}`;
      hero = hero.slice(14);
      players.push(
        <Player key={key} hero={hero} playerName={p.playerName_} slot={i}/>
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
