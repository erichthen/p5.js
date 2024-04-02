
var cols, rows;
var size = 20;
var cells = [];
var current;

function setup() {

    createCanvas(800, 800);
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

    current.visited = true;
    current.highlight();
    var next = current.check_neighbors();
    
    if (next) {

        next.visited = true;

        Cell.remove_wall(current, next);

        current = next;

    }
}