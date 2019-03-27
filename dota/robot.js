const robot = require('robotjs');
const ks = require('node-key-sender');
const clipboardy = require('clipboardy');
const processWindows = require("node-process-windows");
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

const focusDota2 = () => {
  let dota2;
  processWindows.getProcesses((err, processes) => {
    processes.forEach(function (p) {
        if(p.processName === 'dota2') {
          console.log('Dota 2 focused')
          dota2 = p;
        }
    });

    processWindows.focusWindow(dota2.processName);
  });
}

const gotoTick = tick => {
  let timeBefore = 150; //30 ticks = 1 second, 
  tick = 'demo_gototick '+ (tick - timeBefore);
  console.log(tick);
  clipboardy.write(tick).then(() => {
  robot.setKeyboardDelay(20);
  ks.sendKey('p').then(() => {
    robot.keyTap('a', 'control');
    robot.keyTap('v', 'control');
    robot.keyTap('enter');
    ks.sendKey('p');
  });
 
  });
  
  /* .then(() => {
    ks.sendKey('p').then(() => {
      console.log('console opened');
      ks.sendCombination(['control', 'a']).then(() => {
        console.log('text selected');
        ks.sendKey('backspace').then(() => {
          console.log('text deleted');
          ks.sendCombination(['control', 'v']).then(() => {
            console.log('tick pasted');
            ks.sendKey('enter').then(() => {
              console.log('entered pressed');
              ks.sendKey('p').then(() => {
                console.log('console closed');
              }).catch(err => {
                console.log(err);
              })
            }).catch(err => {
              console.log(err);
            });
          }).catch(err => {
            console.log(err);
          })
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    }); */
    
    
   /*  ks.setOption('startDelayMillisec', 200);
    ks.setOption('globalDelayPressMillisec', 1000);
    ks.sendCombination(['control', 'a']);
    ks.sendKey('backspace');
    ks.sendCombination(['control', 'v']); */
}

module.exports = {checkPixelColor,update, focusDota2, gotoTick};