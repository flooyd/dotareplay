const request = require('request');
const fs = require('fs');
const path = require('path');
const ndjson = require('ndjson');
const dotaReplayFolder = 'C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta/game/dota/replays';
const odReplayFolder = path.join(__dirname, '../data/replaysod');

const getParsedReplay = matchid => {
  return new Promise((resolve, reject) => {
    chooseParse(matchid, resolve)
  })
}

module.exports = {getParsedReplay}

function chooseParse(matchid, resolve) {
  fs.readdir(odReplayFolder, (err, files) => {
    console.log('Function chooseParse >Pre-game horn');
    if(err) throw err;
    let odParsedName;
    files.forEach(f => {
      if(f.includes(matchid)) {
        console.log(f);
        odParsedName = f;
      }
    })

    if(odParsedName) {
      myParse(odParsedName, resolve, matchid);
    } else {
      odParse(matchid, resolve);
    }
  })
}

function odParse(matchid, resolve) {
  console.log('Function: odParse >Commend Open Dota');
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
      throw new Error('Replay not found >GG report pls #Error: no replay in replay directory');
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

function myParse(odParsedName, resolve, matchid) {
  let data = {matchInfo: {}}

  console.log('Function: myParse');
  
  fs.createReadStream(`${odReplayFolder}/${odParsedName}`)
    .pipe(ndjson.parse())
    .on('data', o => {
      if (o.type === 'epilogue') {
        return data.matchInfo = getMatchInfo(o);
      }

      if(!data.hasOwnProperty(o.type)) {
        data[o.type] = [];
      }

      data[o.type].push(o);
    })
    .on('finish', () => {
      console.log('NDJSON Parse finish >The battle begins');
      return resolve(data);
    }); 
}


const getMatchInfo = o => {
  o.key = JSON.parse(o.key);

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