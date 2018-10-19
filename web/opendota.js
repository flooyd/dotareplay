const request = require('request');

const getMatch = matchid => {
  matchid = '4172487836';
  let matchUrl = `https://api.opendota.com/api/matches/${matchid}`;
  return new Promise((resolve, reject) => {
    request(matchUrl, (err, res, body) => {
      if(err) {
        return reject(err);
      } else {
        return resolve(JSON.parse(res.body));
      }
    })
  })
}

module.exports = {getMatch}