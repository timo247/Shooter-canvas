import Circle from "./Circle.js";
export default class Bullet extends Circle {
    constructor({ x=  200, y = 200, angle = Math.PI / 2, r = 3, speed = 0.5} = {}){
        super ();
        this.x = x,
        this.y = y,
        this.r = r,
        this.angle = angle,
        this.speed = speed
    }


    move(dt){
    let distX = Math.cos(this.angle) * dt * this.speed;
    let distY = Math.sin(this.angle) * dt * this.speed;
    this.x += distX;
    this.y += distY;
    }
    
}