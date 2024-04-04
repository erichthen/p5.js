
var cols, rows;
var size = 20;
var cells = [];
var current;

//for backtracking
var stack = [];

//for solving
var maze_completed = false;

function setup() {

    createCanvas(400, 400);
    cols = floor(width / size);
    rows = floor(height / size);

    for (var j = 0; j < rows; j++){
        for (var i = 0; i < cols; i++){

            var cell = new Cell(i, j);
            cells.push(cell);

        }
    }
    current = cells[0];
}   


function draw() {

    background(51);

    for (var i = 0; i < cells.length; i++){
        cells[i].show();
    }  

    if (!maze_completed){

        current.visited = true;
        current.highlight();
        var next = current.check_neighbors();

        if (next) {

            next.visited = true;

            stack.push(current);

            Cell.remove_wall(current, next);

            current = next;

        }
        else if (stack.length > 0) {
            current = stack.pop();
        }
        else //done
        {
            maze_completed = true;
        }
    }
}




//=======  solving the maze ======

function  a_star(start, end) {

        let openSet = [start];
        let closedSet = [];

        while (openSet.length > 0) {
            let lowestIndex = 0;
            for (let i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[lowestIndex].f) {
                    lowestIndex = i;
                }
            }

            let current = openSet[lowestIndex];

            if (current === end) {
                return reconstruct_path(end); // Path found
            }

            openSet.splice(lowestIndex, 1);
            closedSet.push(current);

            let neighbors = current.check_neighbors();

            for (let neighbor of neighbors) {
                if (!closedSet.includes(neighbor) && !neighbor.walls_blocking_check(current)) {
                    let tempG = current.g + 1;

                    let newPath = false;
                    if (openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;
                            newPath = true;
                        }
                    } 
                    else {
                        neighbor.g = tempG;
                        newPath = true;
                        openSet.push(neighbor);
                    }

                if (newPath) {
                    neighbor.h = neighbor.estimate(end);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = current;
                }
            }
        }
    }

    return []; // No solution found
}

function reconstruct_path(end) {
    
    let path = [];
    let temp = end;
   
    while (temp.parent) {
        
        path.push(temp);
        temp = temp.parent;

    }
    return path.reverse();
}

//press 'S' to solve the maze
function keyPressed() {
    
    if (key === 'S' && maze_completed) {
        
        let path = a_star(cells[0], cells[cells.length - 1]);
        console.log("Path length: " + path.length); // Check path length
        for (let cell of path) {
            cell.highlightPath(); 
        }
    }
}

    
   
