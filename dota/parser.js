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
    console.log('hello from odReplayFolder');
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
  console.log('parsing replay');
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
      throw new Error('Replay not found');
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
  let objects = [];
  let data = {};
  let epilogue = {};
  let intervals = [];
  let chats = [];
  console.log('In my parse');
  
  fs.createReadStream(`${odReplayFolder}/${odParsedName}`)
    .pipe(ndjson.parse())
    .on('data', obj => {
      objects.push(obj);
    })
    .on('finish', () => {
      console.log('read finished');
      objects = objects.filter((o, i, a) => {
        if (o.type === 'epilogue') {
          a[i].key = JSON.parse(a[i].key);
          a[i].key.gameInfo_.dota_.playerInfo_.forEach((p, i, a) => {
            a[i].heroName_ = String.fromCharCode.apply(null, a[i].heroName_.bytes);
            a[i].playerName_ = String.fromCharCode.apply(null, a[i].playerName_.bytes);
          });
          epilogue = o;
        }
        if (o.type === 'chat') {
          chats.push(o);
        }
        if (o.type === 'interval') {
          intervals.push(o);
        }
      });
      data = {
        epilogue,
        intervals,
        chats
      };
      return resolve(data);
    });
}
