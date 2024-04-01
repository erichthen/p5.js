
var cols, rows;
var size = 40;
var cells = [];

function Cell(i, j) {
    
    this.i= i;
    this.j = j;

    this.show = function() {

        var x = this.i * size;
        var y = this.j * size;

        stroke(255);
        noFill();  

        rect(x, y, size, size);
         
        
    }

}
 
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

}   


function draw() {

    background(51);
    for (var i = 0; i < cells.length; i++){
        cells[i].show();
    }  
}