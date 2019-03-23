import React, { Component } from 'react';
import util from './util/';
import Kill from './Kill';
import './css/player.css'

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {}
    }
  }

  getHeroEndGameStats = () => {
    if(this.props.slot || this.props.slot === 0) {
      let stats = util.getEndGameStats(this.props.slot);
      let hero = util.getHero(this.props.slot);
      
      let src = `http://cdn.dota2.com${hero.img}`;
      return (
        <div className="scoreHero">
          <img src={src} alt={hero.localized_name} className='heroImg'/>
          <div className="playerInfo">
            <p className="playerName">{this.props.player.playerName_}</p>
            <p className="playerHeroName">{hero.localized_name}</p>
          </div>
          <p className="playerKills">{stats.kills}</p>
          <p className="playerKills">{stats.deaths}</p>
          <p className="playerKills">{stats.assists}</p>
          <p className="playerKills">{stats.gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
        </div>
        
      )
    }
  }

  getPVPKills = () => {
    if(this.props.slot || this.props.slot === 0 ) {
      let hero = util.getHero(this.props.slot);
      let kills = util.getPVPKills(hero.name);
    }
  }

  render() {
    return (
      <div className="player">
        {this.getHeroEndGameStats()}
        <div className="killsContainer">
          
        </div>
        {this.getPVPKills()}
      </div>
    );
  }
}

export default Player;
