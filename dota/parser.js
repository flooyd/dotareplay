const request = require('request');
const fs = require('fs');
const path = require('path');
const ndjson = require('ndjson');
const dotaReplayFolder = 'T:\\STEAAAAMMM\\steamapps\\common\\dota 2 beta\\game\\dota\\replays'
const odReplayFolder = path.join(__dirname, '../replaysod');

const getParsedReplay = matchid => {
  return new Promise((resolve, reject) => {
    chooseParse(matchid, resolve)
  })
}

module.exports = {getParsedReplay}

function chooseParse(matchid, resolve) {
  fs.readdir(odReplayFolder, (err, files) => {
    console.log('Function chooseParse #Story >Pre-game horn');
    if(err) throw err;
    let odParsedName;
    files.forEach(f => {
      if(f.includes(matchid)) {
        odParsedName = f;
      }
    })

    if(odParsedName) {
      myParse(odParsedName, resolve);
    } else {
      odParse(matchid, resolve);
    }
  })
}

function odParse(matchid, resolve) {
  console.log('Function: odPares #Story >Commend Open Dota');
  fs.readdir(dotaReplayFolder, (err, files) => {
    let dotaReplayName;
    if (err)
      throw err;
    files.forEach(f => {
      if (f.includes(matchid)) {
        dotaReplayName = f;
      }
    });
    if (!dotaReplayName) {
      throw new Error('Replay not found #Story >GG report pls #Error: no replay in replay directory');
    }
    let readStream = fs.readFileSync(`${dotaReplayFolder}/${dotaReplayName}`);
    let options = {
      url: 'http://localhost:5600',
      body: readStream,
      encoding: null
    };
    request.post(options, (err, res, body) => {
      if (err)
        throw err;
      if (body) {
        fs.writeFile(`${odReplayFolder}/${dotaReplayName}.json`, body, (err) => {
          if (err) {
            console.log(err);
            return res.json({ error: 'error writing ndjson to json' });
          }
          else {
            chooseParse(matchid, resolve);
          }
        });
      }
    });
  });
}

function myParse(odParsedName, resolve) {
  let data = {
    chats: [],
    chatWheels: [],
    purchases: [],
    matchInfo: {},
    intervals: []
  }
  console.log('Function: myParse #Story Various >GG WP and >One of my favorites');
  
  fs.createReadStream(`${odReplayFolder}/${odParsedName}`)
    .pipe(ndjson.parse())
    .on('data', o => {
        if (o.type === 'epilogue') {
          return data.matchInfo = getMatchInfo(o);
        }
        if(o.type === 'DOTA_COMBATLOG_PURCHASE') {
          return data.purchases.push(o);
        }
        if (o.type === 'chat') {
          return data.chats.push(o);
        }
        if (o.type === 'chatwheel') {
          return data.chatWheels.push(o);
        }
        if (o.type === 'interval') {
          return data.intervals.push(o); 
        }
        if(o.type === 'DOTA_COMBATLOG_PURCHASE') {
          return data.purchases.push(o);
        }
      })
    .on('finish', () => {
      console.log('>The battle begins')
      makeInventories(data.purchases, data.matchInfo.players_);
      return resolve(data);
    }); 
}

const getMatchInfo = o => {
  o.key = JSON.parse(o.key)
  console.log(o.key)
  let {playbackTime_, playbackTicks_} = o.key
  let {endTime_, gameMode_, gameWinner_, leagueid_, matchId_} = o.key.gameInfo_.dota_;
  let players_ = o.key.gameInfo_.dota_.playerInfo_;
  realName(players_);
  
  return {
    playbackTime_,
    playbackTicks_,
    endTime_,
    gameMode_, 
    gameWinner_, 
    leagueid_,
    matchId_,
    players_
  }
}

function realName(players_) {
  players_.forEach((p, i, a) => {
    a[i].heroName_ = String.fromCharCode.apply(null, p.heroName_.bytes);
    a[i].playerName_ = String.fromCharCode.apply(null, p.playerName_.bytes);
  });
}

function makeInventories(purchases, players) {
  purchases = purchases.filter(p => {
    if(p.slot !== undefined) {
      return p;
    }
  });

  console.log(purchases.length);
}
