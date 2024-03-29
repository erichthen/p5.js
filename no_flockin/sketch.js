
//todo: optimize 

const no_flock = [];

let align_slider, cohesion_slider, separation_slider;
let radius_slider, max_speed_slider, max_force_slider;

function setup() {
    
    createCanvas(880, 600);

    let title = createElement('h2', 'Boid Flocking Sim');
    title.position(width / 2 - title.size().width / 2 + 263, 15);

    let sliderYOffset = height + 125; 
    let labelYOffset = 20; 
    let spacing = 150; 
    let startX = (width - (spacing * 5)) + 150; 

    align_slider = createSlider(0, 3, 1, 0.1);
    cohesion_slider = createSlider(0, 3, 1, 0.1);
    separation_slider = createSlider(0, 3, 1, 0.1);
    max_force_slider = createSlider(0, 4, 0.5, 0.1);
    max_speed_slider = createSlider(0, 5, 1, 0.1);
    radius_slider = createSlider(0, 1000, 50, 1);
    //boid_count_slider = createSlider(0, 1000, 100, 5);

    alignLabel = createDiv('Alignment: ' + align_slider.value());
    cohesionLabel = createDiv('Cohesion: ' + cohesion_slider.value());
    separationLabel = createDiv('Separation: ' + separation_slider.value());
    maxForceLabel = createDiv('Max Force: ' + max_force_slider.value());
    maxSpeedLabel = createDiv('Max Speed: ' + max_speed_slider.value());
    radiusLabel = createDiv('Radius: ' + radius_slider.value());
    //countLabel = createDiv('Count: ' + boid_count_slider.value());

    align_slider.position(startX, sliderYOffset);
    cohesion_slider.position(startX + spacing, sliderYOffset);
    separation_slider.position(startX + spacing * 2, sliderYOffset);
    max_force_slider.position(startX + spacing * 3, sliderYOffset);
    max_speed_slider.position(startX + spacing * 4, sliderYOffset);
    radius_slider.position(startX + spacing * 5, sliderYOffset);
    //boid_count_slider.position(startX + spacing * 2 + 30, 50);

    alignLabel.position(startX, sliderYOffset - labelYOffset);
    cohesionLabel.position(startX + spacing, sliderYOffset - labelYOffset);
    separationLabel.position(startX + spacing * 2, sliderYOffset - labelYOffset);
    maxForceLabel.position(startX + spacing * 3, sliderYOffset - labelYOffset);
    maxSpeedLabel.position(startX + spacing * 4, sliderYOffset - labelYOffset);
    radiusLabel.position(startX + spacing * 5, sliderYOffset - labelYOffset);
    //countLabel.position(startX + spacing * 2 + 40, 27)

    fpsLabel = createDiv('');
    fpsLabel.style('color', 'black'); 
    fpsLabel.position(startX, 55); 

    for (let i = 0; i < 100; i ++){
        no_flock.push(new Kodak());
    }
}

function draw() {
    
    background(0); 

    alignLabel.html('Alignment: ' + align_slider.value());
    cohesionLabel.html('Cohesion: ' + cohesion_slider.value());
    separationLabel.html('Separation: ' + separation_slider.value());
    maxForceLabel.html('Max Force: ' + max_force_slider.value());
    maxSpeedLabel.html('Max Speed: ' + max_speed_slider.value());
    radiusLabel.html('Radius: ' + radius_slider.value());
                                 
    //purpose of this loop: capture forces in a snapshot and apply at the end
    //rather than applying forces sequentially 
    //which produces unrealistic behavior
    let forces = [];
    for (let f of no_flock) {                                                                                                
        let force = f.flockin(no_flock);
        forces.push(force);
    }

    for (let i = 0; i < no_flock.length; i++) {
        no_flock[i].edges();
        no_flock[i].apply_force(forces[i]);
        no_flock[i].update();
        no_flock[i].show();
    }

    fpsLabel.html('FPS: ' + frameRate().toFixed(2)); 
}
