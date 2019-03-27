let match = {};
let firstBlood;
let last10Intervals = {};
let heroes = require('../dota/heroes.json');
let abilities = require('../dota/abilities.json');

const setLast10Intervals = () => {
  let interval = match.interval;
  last10Intervals = interval.slice(interval.length - 10);
  console.log(last10Intervals);
};

const setFirstBlood = () => {
  let firstBlood = [];
  firstBlood = match.DOTA_COMBATLOG_DEATH.filter(k => {
    if(k.currentTick === match.DOTA_COMBATLOG_FIRST_BLOOD[0].currentTick) {
      k.firstBlood = true;
      return k;
    }
  })
  console.log(firstBlood);
}

const getAbility = abilityName => {
  if(!abilities[abilityName]) {
    return {
      dname: 'UNKNOWN',
      img: ''
    }
  }
  let {dname, img} = abilities[abilityName];
  return {
    dname, 
    img: 'http://cdn.dota2.com' + img};
}

const getHero = (slot) => {
  let hero_id = last10Intervals[slot].hero_id;
  let hero = heroes[hero_id];
  
  return hero;
}

const getHeroLocalizedName = (heroName) => {
  let localizedName;
  Object.keys(heroes).forEach(h => {
    if(heroes[h].name === heroName) {
      localizedName = heroes[h].localized_name;
    }
  })
  return localizedName;
}

const getPVPKills = heroName => {
  let kills = match.DOTA_COMBATLOG_DEATH;
  kills = kills.filter(k => {
    if(k.sourcename === heroName && k.targethero) {
      console.log(k);
      return k;
    }
  });
  
  return kills;
}

const getEndGameStats = (slot) => {
  let interval = last10Intervals[slot];
  let {assists, deaths, denies, firstblood_claimed, gold, hero_id,
       kills, level, lh, obs_placed, randomed, sen_placed, stuns,
       towers_killed, x, xp, y} = interval;

  return {
    assists,
    deaths,
    denies,
    firstblood_claimed,
    gold,
    hero_id,
    kills,
    level,
    lh,
    obs_placed,
    randomed, 
    sen_placed,
    stuns,
    towers_killed,
    x,
    xp,
    y,
    slot
  }
}

const setMatch = m => {
  match = m;
}

module.exports = {
  getEndGameStats, 
  setMatch, 
  setLast10Intervals, 
  getHero, 
  getPVPKills,
  getHeroLocalizedName,
  getAbility,
  setFirstBlood,
  firstBlood
};