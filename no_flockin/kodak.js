//TODO: optimize

class Kodak{

    constructor(){

        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.vel.setMag(random(2, 4));
        this.acc = createVector();
        this.max_force = max_force_slider.value();
        this.max_speed = max_speed_slider.value();

    }

    edges () {
        
        if (this.pos.x > width){
            this.pos.x = 0;
        }
        else if (this.pos.x < 0){
            this.pos.x = width;
        }
        if (this.pos.y > height){
            this.pos.y = 0;
        }
        else if (this.pos.y < 0){
            this.pos.y = height;  
        }
    }

    align (boids) {
        
        let zone_radius = radius_slider.value();  
        let steering = createVector();
        let total = 0;

        for (let other of boids){
            
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < zone_radius) {
                steering.add(other.vel);
                total ++;
            }
        
        }
        if (total > 0) { 
            steering.div(total);
            steering.setMag(this.max_speed);
            steering.sub(this.vel);
            steering.limit(this.max_force);
        }
        return steering;
    }

    cohesion (boids) {
        
        let zone_radius = radius_slider.value();  
        let steering = createVector();
        let total = 0;

        for (let other of boids){
            
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            if (other != this && d < zone_radius) {
                steering.add(other.pos);
                total ++;
            }
        
        }
        if (total > 0) { 
            steering.div(total);
            steering.sub(this.pos);
            steering.setMag(this.max_speed);
            steering.sub(this.vel);
            steering.limit(this.max_force);
        }
        return steering;
    }

     separation (boids) {
        
        let zone_radius = radius_slider.value();
        let steering = createVector();
        let total = 0;

        for (let other of boids){
            
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            
            if (other != this && d < zone_radius) {
                let diff = p5.Vector.sub(this.pos, other.pos);
                diff.div(d ** 2);
                steering.add(diff); 
                total ++; 
            }
        
        }
        if (total > 0) { 
            steering.div(total);
            steering.setMag(this.max_speed);
            steering.sub(this.vel);
            steering.limit(this.max_force);
        }
        return steering;
    }

        
    flockin (boids) {
        
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
    
        alignment.mult(align_slider.value()); 
        cohesion.mult(cohesion_slider.value());
        separation.mult(separation_slider.value());
        
        let totalForce = p5.Vector.add(alignment, cohesion);
        totalForce.add(separation);

        return totalForce;
        }

    apply_force(force) {
        this.acc.add(force);
    }


    update() {
        
        this.pos.add(this.vel); 
        this.vel.add(this.acc);
        this.vel.limit(this.max_speed);
        this.acc.mult(0);
        this.max_force = max_force_slider.value();
        this.max_speed = max_speed_slider.value();

        
    }

    show(){
        
        strokeWeight(8);
        stroke(255);
        point(this.pos.x, this.pos.y);

    }
}