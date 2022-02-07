export default class Shooter {
    constructor({ x = 200, y = 200, turnSpeed = 0.003, fireRate = 10, angle =  - Math.PI / 2, color = "green", r = 30 } = {}) {
        this.x = x,
            this.y = y,
            this.r = r,
            this.turnSpeed = turnSpeed,
            this.fireRate = fireRate,
            this.angle = angle,
            this.color = color
        this.canonXExtremity = 0,
            this.canonYExtremity = 0
        this.lastTimeShot = Date.now()
        this.targets = new Map
    }

    draw(ctx) {
        //clear
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        //Cercle
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        //Canon
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        let canonPos = this.calculateShootingAngle(this.x, this.y)
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(canonPos.x, canonPos.y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    }

    calculateShootingAngle(x1, y1) {
        let x2 = x1 + 2 * this.r * Math.cos(this.angle)
        let y2 = y1 + 2 * this.r * Math.sin(this.angle)

        let angle = { x: x2, y: y2 }
        this.canonXExtremity = angle.x
        this.canonXExtremity = angle.y
        return angle
    }

    turnCannon(dt, dir) {
        if (dir == 'left') {
           // if (this.angle + dt * this.turnSpeed < 0 && this.angle >= 2 * Math.PI) {
                this.angle -= dt * this.turnSpeed
            //} 
        } else if (dir == 'right') {
           // if (this.angle - dt * this.turnSpeed < 0 && this.angle >= 2 * Math.PI) {
                this.angle += dt * this.turnSpeed
           // }
        }
    }

    udpateBullets(bullets, dt) {
        bullets.forEach(bullet => {
            bullet.move(dt)
        });
    }


    checkCollision(bullets) {
        bullets.forEach(bullet => {
            if(this.isCollidingWith(bullet)){
                this.targets.delete
            }
        });
    }

    isCollidingWith(bullet) {
        this.targets.forEach(target => {
            let collision = Math.abs(target.x - bullet.x) ** 2 + Math.abs(target.y - bullet.y) ** 2 <= Math.abs(target.r + bullet.r) ** 2;
            if(collision){
                console.log("collisiosn")
                console.log(this.targets)
                this.targets.delete(target.targetKey)
                return(collision)
            }
        });
    }

}