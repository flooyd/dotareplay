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
  match.DOTA_COMBATLOG_DEATH.filter(k => {
    if (k.currentTick === match.DOTA_COMBATLOG_FIRST_BLOOD[0].currentTick) {
      k.firstBlood = true;
      return k;
    }
    return null;
  })
}

const getAbility = abilityName => {
  if (!abilities[abilityName]) {
    return {
      dname: 'UNKNOWN',
      img: ''
    }
  }
  let { dname, img } = abilities[abilityName];
  return {
    dname,
    img: 'http://cdn.dota2.com' + img
  };
}

const getHero = (slot) => {
  let hero_id = last10Intervals[slot].hero_id;
  let hero = heroes[hero_id];

  return hero;
}

const getHeroLocalizedName = (heroName) => {
  let localizedName;
  Object.keys(heroes).forEach(h => {
    if (heroes[h].name === heroName) {
      localizedName = heroes[h].localized_name;
    }
  })
  return localizedName;
}

const getPVPKills = heroName => {
  let kills = match.DOTA_COMBATLOG_DEATH;
  kills = kills.filter(k => {
    if (k.sourcename === heroName && k.targethero) {
      k.multiKill = getMultiKillValue(k.currentTick);
      return k;
    }
    return null;
  });

  return kills;
}

const getMultiKillValue = (currentTick) => {
  let multiKill = null;
  
  match.DOTA_COMBATLOG_MULTIKILL.find(mk => {
    if (mk.currentTick === currentTick) {
      multiKill = mk;
    }

    return null;
  })

  if(multiKill) {
    switch (multiKill.value) {
      case 0:
        return null;
        break;
      case 1:
        return null;
        break;
      case 2: 
        return 'DOUBLE Kill!'
        break;
      case 3: 
        return 'TRIPLE Kill!'
        break;
      case 4:
        return 'ULTRA Kill!'
      case 5:
        return 'RAMPAGE!'
        break;
    }
  }

  return null;
  
}

const getEndGameStats = (slot) => {
  let interval = last10Intervals[slot];
  let { assists, deaths, denies, firstblood_claimed, gold, hero_id,
    kills, level, lh, obs_placed, randomed, sen_placed, stuns,
    towers_killed, x, xp, y } = interval;

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