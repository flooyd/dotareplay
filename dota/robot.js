const robot = require('robotjs');
const ks = require('node-key-sender');
const clipboardy = require('clipboardy');
const state = {
  step: ''
}

/*This is all pretty wonky at the moment. Use caution as well, I'm not sure if
  something like this could get your account banned in Steam, but I have been using my
  account for a few days w/ no trouble.

  Module is included in main.js, so you can call it there (robot.update())
*/

const update = () => {
  setInterval(() => {
    checkPixelColor();
  }, 1000);
}
const checkPixelColor = () => {
    try {
      let {x,y} = robot.getMousePos();
      console.log(x,y);
      console.log(robot.getPixelColor(1312,1049))
      if(robot.getPixelColor(1312,1049) === "222222") {
        state.step = 'replay'
        gotoTick(11149);
      } else if (robot.getPixelColor(1312,1049) === "1f2427") {
        state.step = 'menu'
      }
    } catch (e) {

    }
}

const gotoTick = tick => {
  tick = 'demo_gototick ' + tick
  clipboardy.write(tick)
  .then(() => {
    robot.keyTap('delete');
    ks.setOption('globalDelayPressMillisec', 500);
    setTimeout(() => {
      ks.sendCombination(['control', 'a']);
      ks.sendKey('backspace');
      ks.sendCombination(['control', 'v'])
    }, .500)
  })
}

module.exports = {checkPixelColor,update};