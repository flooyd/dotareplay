const OBSWebSocket = require('obs-websocket-js');

function openObs() {
  let args = [];
  execFile('C:/Users/LordR/Desktop/obs.lnk', args, {shell: true}, (err, stdout, stderr) => {
    if(err) {
      console.log(err);
    }
    if(stdout) {
      console.log(stdout);
    }
    if(stderr) {
      console.log(stderr);
    }
  });
}

function startRecording() {
  obs = new OBSWebSocket();
  obs.connect()
  .then(() => {
    console.log('Obs should be recording here');
  })
}

module.exports = {
  openObs, 
  startRecording
}