
/*falling sand simulation, has user drag mouse around the screen
youtube tutorial has been sent*/

/*they will need to be in vscode and in the directory with the html and js files, 
and run the command <live-server>, which will load the html page that will display this 
I know sebastian has this set up and I belive Marcus does, if not sebastian can help, he should have 
p5.js and node.js installed, as well as the live-server vscode extension, which are the three things needed*/


/*first funtion we built, they learned about 2D arrays, where a square in the grid 
is used to register the state (show : 1 /hide : 0) of one block of sand*/
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

let hueValue = 200; //color of the sand, this huevalue, background function which takes an rgb, 
//and colorMode functions can all be whatever

function setup()
{
    createCanvas(1200, 800);
    colorMode(HSB, 360, 100, 100); //save this for when you want to add color to the sand
    cols = width / w;
    rows = height / w;
    grid = make_grid(cols, rows);
    h = height / rows;
    frameRate(60);

    for (let i = 0; i < cols; i++)
    {
        for (let j = 0; j < rows; j++)
        {
             grid[i][j] = 0;        //set each square of the grid to zero which means no sand in grid
        }
    }
}


function mouseDragged()
{
    //bind mouse location to a corresponding grid location
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / h);
    

    //for variabilty, sand is clumped to an extent when user drags
    let matrix = 5
    let extent = floor (matrix / 2 /*this val can change that*/); 
    

    for (let i = -extent; i <= extent; i++)
    {
        for (let j = -extent; j <= extent; j++)
        {
            if (random(1) < 0.75) //spawn rate
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
    //this is optional and changes the color of the sand as it is being spawned
    hueValue += 1;
    if (hueValue >= 360)
    {
        hueValue = 1;
    }
}

function draw() {



        background(180, 80, 100); //I did this for a blue sky background
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

                //cell has sand
                if (state > 0) {
                    let cell_below = (j + 1 < rows) ? grid[i][j + 1] : 1;
                    let dir = random(1) < 0.5 ? -1 : 1; //fall on top: left or right
                    //handling the movement and cells below an alive cell
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
        //update the grid
        grid = next_grid;

        //optional, drew a sun
        fill(60, 255, 255);
        ellipse(width - 130, 130, 150, 150);
}
