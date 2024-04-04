
class Cell {

    constructor(i, j) {

        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true];
        this.visited = false;

        //for A* s to solve maze
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.parent = null;

    }

    static remove_wall(current, next) {

        var x = current.i - next.i;

        if (x === 1) {
            current.walls[3] = false;
            next.walls[1] = false;
        }
        else if (x === -1) {
            current.walls[1] = false;
            next.walls[3] = false;
        }

        var y = current.j - next.j;

        if (y === 1) {
            current.walls[0] = false;
            next.walls[2] = false;
        }
        else if (y === -1) {
            current.walls[2] = false;
            next.walls[0] = false;
        }

    }

    get_index(i, j) {

        if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
            return -1;
        }
        return i + j * cols;
    }

    check_neighbors() {

        var neighbors = [];
        var top = cells[this.get_index(this.i, this.j - 1)];
        var bottom = cells[this.get_index(this.i, this.j + 1)];
        var right = cells[this.get_index(this.i + 1, this.j)];
        var left = cells[this.get_index(this.i - 1, this.j)];

        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (left && !left.visited) {
            neighbors.push(left);  
        }
        
        if (neighbors.length > 0) {
            var rand = floor(random(0, neighbors.length));
            return neighbors[rand];
        }
        else {
            return undefined;
        }

    }

    highlight() {
        
        var x = this.i * size;
        var y = this.j * size;
        
        noStroke();
        fill(9, 85, 137);
        rect(x, y, size, size);
    }

    

    estimate(target) {

        return abs(this.i - target.i) + abs(this.j - target.j);

    }

    //for solving
    walls_blocking_check(neighbor) {
        
        const deltaX = neighbor.i - this.i;
        const deltaY = neighbor.j - this.j;

        if (deltaX === 1) {

            return this.walls[1];

        } else if (deltaX === -1) {

            return this.walls[3];

        }

        if (deltaY === 1) {

            return this.walls[2];

        } 
        else if (deltaY === -1) {

            return this.walls[0];

        }

        return false;
    }

    show() {

        var x = this.i * size;
        var y = this.j * size;

        stroke(0);

        if (this.walls[0]){
            line(x, y, x + size, y);
        }

        if (this.walls[1]){
            line(x + size, y, x + size, y + size);
        }

        if (this.walls[2]){
            line(x + size, y + size, x, y + size);
        }

        if (this.walls[3]){
            line(x, y + size, x, y)
        }

        if (this.visited) {

            noStroke();
            fill(0, 153, 153, 100)
            rect(x, y, size, size);
            
        }
    }
}