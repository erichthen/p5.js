let gravity;
let snow = [];

let z_offset = 0;

function setup() {
    
    createCanvas(1000, 675);

    gravitySlider = select('#gravitySlider');
    windSlider = select('#windSlider');
    flakeCountSlider = select('#flakeCountSlider');

    gravity = createVector(0, 0.3); 
    for (let i = 0; i < 400; i ++){
        let x = random(width);
        let y = random(height);
        snow.push(new Snowflake(x, y));

    }
}
 
function draw(){

    background(0);

    z_offset += 0.01;

    gravity = createVector(0, float(gravitySlider.value()));
    
    let windStrength = windSlider.value();
    adjustFlakeCount(flakeCountSlider.value());

    for (let flake of snow) {
        let x_offset = flake.pos.x / width;
        let y_offset = flake.pos.y / height;
        let wind_angle = noise(x_offset, y_offset, z_offset) * TWO_PI;
        let wind = p5.Vector.fromAngle(wind_angle);
        wind.mult(windStrength); 
        
        let gravityForce = p5.Vector.mult(gravity, flake.r);
        flake.applyForce(gravityForce);
        flake.applyForce(wind);
        flake.update();
        flake.render();
    }

    draw_window_frame();
    image(curtain, -2, -2, width + 5, height);

}


function adjustFlakeCount(targetCount) {
    
    while (snow.length < targetCount) {
        let x = random(width);
        let y = random(height);
        snow.push(new Snowflake(x, y));
    }
    while (snow.length > targetCount) {
        snow.pop();
    }
}


function draw_window_frame() {
    fill('#783f04'); 
    noStroke();

    let barWidth = 10; 
    rect(0, height / 2 - barWidth / 2, width, barWidth);  
    rect(width / 2 - barWidth / 2, 0, barWidth, height); 

    let borderWidth = 20; 
    rect(0, 0, width, borderWidth); 
    rect(0, height - borderWidth, width, borderWidth); 
    rect(0, 0, borderWidth, height); 
    rect(width - borderWidth, 0, borderWidth, height); 
}

