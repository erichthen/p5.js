function get_random_size(){
    let r = pow(random(0,1), 4);
    return constrain(r * 36, 2, 36); 

} 

let snowflake_images = [];
let curtain;
function preload(){
    for (let i = 1; i <= 3; i++){
            snowflake_images.push(loadImage("flake" + i + ".png"));
    }  
    curtain = loadImage("curtain.png");
}

class Snowflake{

    constructor(sx,sy){
        let x = sx || random(width);
        let y = sy || random(-100, -10);
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector();
        this.r = get_random_size();
        this.img = random(snowflake_images);
        this.angle = random(TWO_PI);
        this.direction = (random(1) > 0.5)? 1 : -1; 
        this.x_offset = 0; 

    }

    applyForce(force){ 
        
        //smaller flakes, farther away, fall slower
        let f = force.copy();
        f.mult(this.r);

        this.acc.add(f);
    }

    randomize(){
        let x = random(width);
        let y = random(-100, -10);
        this.pos = createVector(x,y);
        this.vel = createVector(0, 0);
        this.acc = createVector();
        this.r = get_random_size();
        this.img = random(snowflake_images);
    }


    update(){

        this.x_offset = sin(this.angle) * 2 * this.r;
        
        this.vel.add(this.acc);
        this.vel.limit(this.r * 0.1);
        
        if (this.vel.mag() < 1){
            this.vel.normalize();
        }

        this.pos.add(this.vel);
        this.acc.mult(0);
         
        if (this.pos.y > height + this.r ) {
            this.randomize();
        }

        if (this.pos.x < -this.r){
            this.pos.x = width + this.r;
        }

        if (this.pos.x > width + this.r){
            this.pos.x = -this.r;
        }

        this.angle += this.direction * this.vel.mag() / 200 ; 

    }

    render(){
        
        push();
        translate(this.pos.x + this.x_offset, this.pos.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.img, 0, 0, this.r, this.r);
        pop();

 
    }

}