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

  getKillString = () => {
    let {attacker, enemy, ability, abilityImg, time, firstBlood} = this.props;
    if(firstBlood) {
      firstBlood = ' - FIRST BLOOD!'
    } else {
      firstBlood = null;
    }
    let img = <img src={abilityImg} alt={ability}/>
    return <p>{attacker} killed {enemy} with 
              {img}
              at {this.fmtMSS(time)} {firstBlood}</p>
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
