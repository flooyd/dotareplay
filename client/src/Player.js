import React, { Component } from 'react';
import './css/player.css'

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: ['']
    }
  }
  
  getKills() {
    let playerKills = this.props.kills.filter(k => {
      if(k.ispvpkill & k.attackername === this.props.player.heroName_) {
        return k;
      }
    });

    let kills = [];
    playerKills.forEach(k => {
      kills.push(
        <p>{k.attackername} killed {k.targetname}</p>
      )
    });

    return kills;
  }

  render() {
    return (
      <div className="player">
        {this.getKills()}
      </div>
    );
  }
}

export default Player;
