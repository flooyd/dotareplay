import React, { Component } from 'react';
import util from './util/';
//import './css/Kill.css';

class Kill extends Component {
  constructor(props) {
    super(props);
    
  }

  componentDidMount = async () => {
   //console.log(this.props);
  }

  //https://stackoverflow.com/a/37770048
  fmtMSS(s) {
    return(s-(s%=60))/60+(9<s?':':':0')+s
  }

  handleTimeClicked = async (e,tick) => {
    let response = await fetch(`http://localhost:3000/gotoTick/${tick}`);
    console.log(response);
  }

  getKillString = () => {
    let {attacker, enemy, ability, abilityImg, time, firstBlood, tick} = this.props;
    let img = <img src={abilityImg} alt={ability}/>
    if(firstBlood) {
      firstBlood = ' - FIRST BLOOD!'
    } else {
      firstBlood = null;
    }

    if(ability === 'UNKNOWN') {
      img = 'Unknown inflictor'
    }
   
    return (
      <div className='kill'>
        <p>{enemy}</p>
        <p>{firstBlood}</p>
        <p>{img}</p>
        <div className="killTime">
          <p>{this.fmtMSS(time)}</p>
          <button onClick={e => this.handleTimeClicked(e,tick)}>Goto Tick</button>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div className="kill">
        {this.getKillString()}
      </div>
    );
  }
}

export default Kill;
