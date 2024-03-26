var inc = 0.1;
var scl = 10;
var cols, rows;
var z_off = 0;
var fr; 
var particles = [];
var flowfield; 

function setup(){

    createCanvas(600, 300, P2D);

    cols = floor(width / scl);
    rows = floor(height / scl);

    flowfield = new Array(cols * rows);
    for (let i = 0; i < 200 /*play with*/; i++){
        particles.push(new Particle()); 
    }
    background(255);
}

function draw()
{
    var y_off = 0;

    for (var y = 0;   y < rows; y++){
        var x_off = 0;
        for (var x = 0; x < cols; x++){
            var index = x + y * cols;
            var angle  = noise(x_off, y_off, z_off) * TWO_PI * 1.3; //play with - multiply 2pi by a const
            var v = p5.Vector.fromAngle(angle);
            v.setMag(4); //play with
            flowfield[index] = v;
            x_off += inc; 
        } 
        y_off += inc; 
        z_off += 0.0003 ;  //play with
    }
    for(var i = 0; i < particles.length; i++){
        particles[i].follow(flowfield)
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }
}