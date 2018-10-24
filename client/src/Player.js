import React, { Component } from 'react';
import './css/player.css'

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: ['']
    }
  }
  render() {
    return (
      <div className="player">
        <p>{this.props.hero}</p>
        <p>{this.props.playerName}</p>
        <p>{this.props.slot}</p>
      </div>
    );
  }
}

export default Player;
