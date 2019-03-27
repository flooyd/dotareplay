import React, { Component } from 'react';
import util from './util/';
import Kill from './Kill';
import './css/player.css'

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showKills: false
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
    if(this.state.showKills && (this.props.slot || this.props.slot === 0)) {
      let hero = util.getHero(this.props.slot);
      let kills = util.getPVPKills(hero.name);

      let killElements = kills.map((k, i) => {
        
        let attackerLocalized = util.getHeroLocalizedName(k.attackername);
        let enemyLocalized = util.getHeroLocalizedName(k.targetname)
        let ability = util.getAbility(k.inflictor);

        let firstBlood = false;
        if (k.firstBlood) {
          firstBlood = true;
        }

        return <Kill key={`Player${this.props.slot}-Kill${i}`}
                     tick={k.currentTick}
                     firstBlood={firstBlood}
                     attacker={attackerLocalized}
                     firstBlood={firstBlood}
                     currentTick={k.currentTick}
                     enemy={enemyLocalized}
                     inflictor={k.inflictor}
                     time={k.time}
                     ability={ability.dname}
                     abilityImg={ability.img}/>
      })

      return killElements;
    }
  }

  handlePlayerClicked = () => {
    this.setState({showKills: !this.state.showKills})
  }

  render() {
    return (
      <div className="player">
        <div className="playerStats" onClick={this.handlePlayerClicked}>{this.getHeroEndGameStats()}</div>
        <div className="killsContainer">
          {this.getPVPKills()}
        </div>
      </div>
    );
  }
}

export default Player;
