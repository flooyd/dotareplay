const request = require('request');
const fs = require('fs');
const ndjson = require('ndjson');
const replayFolder = 'T:\\STEAAAAMMM\\steamapps\\common\\dota 2 beta\\game\\dota\\replays'
const getParsedReplay = matchid => {

  return new Promise((resolve, reject) => {
    let replayName;
    /* - TODO - We should check to see if parsed replay file for demo exists 
                in ./replays. If not, get the demo file name and send it to 
                parser below. If parsed file exists, return it.*/
    fs.readdir(replayFolder, (err, files) => {
      if(err) {
        console.error(err);
      }
      
      files.forEach(f => {
        if(f.includes(matchid)) {
          replayName = f;
        }
      })
      
      console.log(replayName);
    })
    
    // - TODO - Make dyanmic 
    let readStream = fs.readFileSync('T:\\STEAAAAMMM\\steamapps\\common\\dota 2 beta\\game\\dota\\replays\\4172487836.dem');

    let options = {
      url: 'http://localhost:5600',
      body: readStream,
      encoding: null
    }

    request.post(options, (err, res, body) => {
      if(err) reject(err);
      if(body) resolve(body)
    })
  })
}

module.exports = {getParsedReplay}