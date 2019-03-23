/* ----- NPM MODULES ----- */
const {app, BrowserWindow} = require('electron');
const {spawn, execFile} = require('child_process');
const express = require('express');
const expressApp = express();
const {getParsedReplay} = require('./dota/parser');
const fs = require('fs');
const ndjson = require('ndjson');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

/* ----- DOTAREPLAY MODULES ----- */
//const robot = require('./dota/robot');
const {openObs, startRecording} = require('./dota/obs');
const {getMatch} = require('./web/opendota');
// - TODO - needs to be dynamic and able to be set by user 
const replayFolder = 'T:\\STEAAAAMMM\\steamapps\\common\\dota 2 beta\\game\\dota\\replays'

expressApp.use(cors());

// - TODO - add express router

/*This is just convenient if you need to see what match details look like.
  I do not plan on calling Open Dota, however, and will get everything I need
  from the parsed replay files.
  
  ./web/opendota.js */

expressApp.get('/match', (req, res) => {
 /*  getMatch()
  .then(match => {
    res.json(match);
  })
  .catch(err => {
    console.error(err);
  })
}) */
});

//See two functions below
expressApp.post('/api/getreplays', jsonParser, (req, res) => {
  
  let matchids = req.body;
  replaysNeeded(matchids)
  .then(matches => {
    downloadReplays(matches)
    .then(replays => {
      res.send(replays);
    })
  })
});

/* This calls opendota for match details in order to retrieve the hosted replay
   URLS. The match ids are sent from the client (react) - 50 max. Right now,
   the links are sent back to react to be manually downloaded. This should be
   refactored to use the getMatch function described above, and extended to save
   the replay files automatically. */

downloadReplays = async (matchids) => {
  return new Promise((resolve, reject) => {
    let counter = 0;
    let replayLinks = [];
    let interval = setInterval(() => {
      if(counter <= matchids.length - 1) {
        console.log(`Number of matches: ${counter}`);
        const matchid = matchids[counter];
        const url = `https://api.opendota.com/api/matches/${matchid}`;
        request(url, (err, res, body) => {
          if(err) return console.error(err);
          let replay_url = JSON.parse(body).replay_url;
          replayLinks.push(replay_url);
        })
        counter++;
      } else {
        resolve(replayLinks);
        clearInterval(interval);
      }
    }, 1075)
  })
}

/*This checks the replay folder against the ids sent by client to see if
  the replay already exists. The function above will then get the links
  for each needed replay.*/

replaysNeeded = matchids => {
  let matches = [];
  return new Promise((resolve, reject) => {
    fs.readdir(replayFolder, (err, files) => {
      matchids.forEach(m => {
        let matchExists = files.some(f => {
          return f.includes(m);
        })
        if(!matchExists) {
          matches.push(m);
        }
      })
      resolve(matches);
    })
  })
  
}

/*This is just a sandbox to learn how to parse ndjson after java replay parser.

  You can see a parsed replay in ./replays/replay.json. If you ctrl+f "ispvpkill" 
  that was added by me in the Java parser. Find the opendota parser on github (google).
  You will need to clone that parser, build it using Maven after making modifications,
  and then run it (it runs on localhost:5600). You can then POST a file to it, and it 
  will parse it and return NDJSON (newline delimited JSON).

  If you're interested in more detailed instructions, create an issue on my repo and
  I will be happy to help :D */

expressApp.get('/api', (req, res) => {
  getParsedReplay('4555639620')
  .then(replay => {
    console.log('api endpoint');
    res.json(replay);
  })
  .catch(err => {
    res.json(err);
  })
})

let win;

const parseMatch = matchid => {
 
}

expressApp.listen(3000, () => {
  console.log('Express App listening');
})

parseMatch();



function createWindow() {
  win =  new BrowserWindow({});

  win.loadURL('http://localhost:3001');

  //open dev tools
  //win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', () => {
  createWindow();
  //robot.update();
});

//Quit when all windows are closed
app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});
