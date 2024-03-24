const density = '!Ñ@#\$9876543210?!|abc;:+=-,_-';

//500x500 -> 50x50
//low res for an easier and better ascii output
let daddy;


function preload()
{
    daddy = loadImage("daddy_pixeled.jpg");
}

function setup()
{
    createCanvas(400, 400)
}

function draw()
{

    //noCanvas();

    background(0);
    // image (daddy, 0, 0, width, height);

    let w = width / daddy.width;
    let h = height / daddy.height;
    daddy.loadPixels();
    
    for (let i = 0; i < daddy.height; i++)
    {
        for (let j = 0; j < daddy.width; j++)
        {
            //loading r,g,b,a for every pixel
            const pixel_index = (i + j * daddy.width) * 4; //4 vals per pixel
            const r = daddy.pixels[pixel_index + 0];
            const g = daddy.pixels[pixel_index + 1];
            const b = daddy.pixels[pixel_index + 2];
                    //a (alpha, 4th val) doesn't matter
            const avg = (r + b + g) / 3
            
            noStroke();
            fill(avg);
            //square(i * w, j * h, w);
            const len = density.length;             
            const charIndex = floor(map(avg, 0, 255, len, 0)); 

            textSize(w)
            textAlign(CENTER, CENTER)
            text(density.charAt(charIndex), i * w + w * 0.5, j * h + h * 0.5)
            //row += density.charAt(charIndex) //, i * w + w * 0.5, j * h + h * 0.5;
            
        }
        //console.log(row);
    }
}