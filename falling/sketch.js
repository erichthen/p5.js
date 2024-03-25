

function make_grid(cols, rows)
{
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++)
    {
        arr[i] = new Array(rows);
        for (let j = 0; j < arr[i].length; j++)
        {
            arr[i][j] = 0;
        }
    }
    return arr;
}

let grid;
let w = 10;
let cols, rows;  

let hueValue = 200; 

function setup()
{
    createCanvas(1200, 800);
    colorMode(HSB, 360, 100, 100);
    cols = width / w;
    rows = height / w;
    grid = make_grid(cols, rows);
    h = height / rows;
    frameRate(60);

    for (let i = 0; i < cols; i++)
    {
        for (let j = 0; j < rows; j++)
        {
             grid[i][j] = 0;
        }
    }
}


function mouseDragged()
{
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / h);
    
    let matrix = 5
    let extent = floor (matrix / 2); //for variabilty

    for (let i = -extent; i <= extent; i++)
    {
        for (let j = -extent; j <= extent; j++)
        {
            if (random(1) < 0.75)
            {
                let col = mouseCol + i;
                let row = mouseRow + j;
                
                if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1)
                {
                    grid[col][row] = hueValue;
                }
            }
        }
    }
    hueValue += 1;
    if (hueValue >= 360)
    {
        hueValue = 1;
    }
}

function draw() {


        colorMode(180, 100, 100)
        background(180, 80, 100);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                noStroke();
                if (grid[i][j] > 0) {
                    fill(grid[i][j], 255, 255);
                    let x = i * w;
                    let y = j * w;
                    square(x, y, w); 
                }
            }
        }
        let next_grid = make_grid(cols, rows);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                if (state > 0) {
                    let cell_below = (j + 1 < rows) ? grid[i][j + 1] : 1;
                    let dir = random(1) < 0.5 ? -1 : 1;
                    let below_a = (i + dir >= 0 && i + dir < cols && j + 1 < rows) ? grid[i + dir][j + 1] : 1;
                    let below_b = (i - dir >= 0 && i - dir < cols && j + 1 < rows) ? grid[i - dir][j + 1] : 1;
                    if (cell_below === 0) {
                        next_grid[i][j + 1] = grid[i][j];
                    } else if (below_a === 0) {
                        next_grid[i + dir][j + 1] = grid[i][j];
                    } else if (below_b === 0) {
                        next_grid[i - dir][j + 1] = grid[i][j];
                    } else {
                        next_grid[i][j] = grid[i][j];
                    }
                }
            }
        }
        //draw the sun
        grid = next_grid;
        fill(60, 255, 255);
        ellipse(width - 130, 130, 150, 150);
    }
