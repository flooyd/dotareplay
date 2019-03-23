let match = {};
let last10Intervals = {};
let heroes = require('../dota/heroes.json');

const setLast10Intervals = () => {
  let interval = match.interval;
  last10Intervals = interval.slice(interval.length - 10);
  console.log(last10Intervals);
};

const getHero = (slot) => {
  let hero_id = last10Intervals[slot].hero_id;
  let hero = heroes[hero_id];
  
  return hero;
}

const getPVPKills = heroName => {
  let kills = match.DOTA_COMBATLOG_DEATH;
  kills = kills.filter(k => {
    if(k.sourcename === heroName && k.targethero) {
      return k;
    }
  });
  console.log(kills);
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

module.exports = {getEndGameStats, setMatch, setLast10Intervals, getHero, getPVPKills};