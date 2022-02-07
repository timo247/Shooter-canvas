import Bullet from "./class/bullet.js";
import Circle from "./class/Circle.js";
import Keyboard from "./class/keyboard.js";
import Shooter from "./class/shooter.js";
import { getRandomInt } from "./lib/MATH.js";
import MainLoop from "/lib/Mainloop.js"
import {randomColor} from "/lib/randomColor.js"
//console.log("hello world")


/* Init */
let ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.height = ctx.canvas.clientHeight;
ctx.canvas.width = ctx.canvas.clientWidth;
let lastTime = Date.now()

/* Player */
let player = new Shooter({ r: 30, y: ctx.canvas.clientHeight - 30, x: ctx.canvas.clientWidth / 2 })

/*Bullet */
let bullets = []
let haveShooted = false

/* Keyboard */
let keyboard = new Keyboard({ useCode: true });


/*Targets */
let target = new Circle({r: 20, y: 20, x: getRandomInt(0, ctx.canvas.clientWidth), color: randomColor(), speed: 0.1, angle: Math.PI / 2 });

/* Main loop */
let pause = false
MainLoop.setSimulationTimestep(1000 / 60);

let targetKey = 0
MainLoop.setUpdate(dt => {


    

    if (keyboard.isKeyDown('KeyA')) {
        player.turnCannon(dt, 'left');
       // console.log("coucou")
      }
      if (keyboard.isKeyDown('KeyD')) {
        player.turnCannon(dt, 'right');
      }
      if (keyboard.isKeyDown('Space')) {
        haveShooted = true
    
        let currentTime = Date.now()
        let timeDiff = currentTime - player.lastTimeShot;
    
        if (timeDiff >= player.fireRate*100) {
            let bullet = new Bullet({ x: player.x, y: player.canonYExtremity + player.y, angle: player.angle})
            bullets.push(bullet)
            player.lastTimeShot = Date.now()
            console.log(timeDiff)
        } 

      } 

    /*

    keyboard.onKeyDown('a', () => {
        player.turnCannon(keyboard.loopDt, 'left')
    });
    
    
    keyboard.onKeyDown('d', () => {
        player.turnCannon(keyboard.loopDt, 'right')
    });
    
    keyboard.onKeyDown(' ', () => {
        haveShooted = true
    
        let currentTime = Date.now()
        let timeDiff = currentTime - player.lastTimeShot;
    
        if (timeDiff >= player.fireRate*100) {
            let bullet = new Bullet({ x: player.x, y: player.canonYExtremity + player.y, angle: player.angle})
            bullets.push(bullet)
            player.lastTimeShot = Date.now()
            console.log(timeDiff)
        } else {
            return
        }

    });
    

*/

    if (pause) return;
    keyboard.loopDt = dt

    if (haveShooted) {
        player.udpateBullets(bullets, keyboard.loopDt)
    }

    let currentTime = Date.now()
    if(currentTime - lastTime >= 1000){
        targetKey ++

        let target = new Circle({r: 20, y: 20, x: getRandomInt(0, ctx.canvas.clientWidth), color: randomColor(), speed: 0.1, angle: Math.PI / 2 });
        target.targetKey = targetKey
        player.targets.set(targetKey, target)
        lastTime = Date.now()
    }

    player.targets.forEach(target => {
        target.move(dt)
        if(target.controlPos(ctx)){
           MainLoop.stop()
        }
    });
    player.checkCollision(bullets)
});

MainLoop.setDraw(() => {
    player.draw(ctx)

    if (haveShooted) {
        bullets.forEach(bullet => {
            bullet.draw(ctx)
        });
    }

    player.targets.forEach(target => {
        target.draw(ctx)
    });
});

MainLoop.setEnd((fps, panic) => {
    if (!panic) return;
    console.log('panic');
    MainLoop.resetFrameDelta();
});

MainLoop.start();
