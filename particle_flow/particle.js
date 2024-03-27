

class Particle{

    constructor(){
        this.pos = createVector(random(width),random(height));
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
<<<<<<< HEAD
        this.maxspeed = 4; //play with
=======
        this.maxspeed = 6; //play with
>>>>>>> 0dc966ce4d4a22daab680085a243d22670ff1ebd
        
        this.previous_pos = this.pos.copy();

    }
    
    update = function(){

        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

    }

    follow = function(vectors){
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols; //get index for 2d arr
        var force = vectors[index];
        this.applyForce(force);
    }

    applyForce = function (force){
        this.acc.add(force);
    }

    show = function() {
    
       
            colorMode(HSB, 360, 100, 100, 1); 
<<<<<<< HEAD
            let hueValue = 330;  //play with
            let sat = map(this.pos.y, 0, height, 50, 100);

            let bright = map(this.pos.y, 0, height, 100, 20);
            strokeWeight(2); //play with
            stroke(hueValue, sat, bright, 0.1 /*play with*/);
=======
            let hueValue = 330; 
            let sat = map(this.pos.y, 0, height, 50, 100);

            let bright = map(this.pos.y, 0, height, 100, 20);
            strokeWeight(2);
            stroke(hueValue, sat, bright, 0.1);
>>>>>>> 0dc966ce4d4a22daab680085a243d22670ff1ebd
            line(this.pos.x, this.pos.y, this.previous_pos.x, this.previous_pos.y);
            this.updatePrevious(); 
            
    }
    

    updatePrevious = function(){
        this.previous_pos.x = this.pos.x;
        this.previous_pos.y = this.pos.y;

    }

   
    edges = function(){
        if (this.pos.x > width){
            this.pos.x = 0;
            this.updatePrevious();
        }
        if (this.pos.x < 0){
            this.pos.x = width;
            this.updatePrevious();
       }
        if (this.pos.y > height){
            this.pos.y = 0;
            this.updatePrevious();
        }    
        
        if (this.pos.y < 0){
            this.pos.y = height;
            this.updatePrevious();
        }
    }
}