/**
 * Tom Mahoney
 * CIT360
 * Assignment 3 - js
 *
 * Page is hosted, for assignment instructions see:
 *
 * https://tommaho.github.io/PCT_CIT360/Assignment_3/
 *
 * Known Bugs:
 *
 * When you generate a maze without resetting the page, it seems like
 * there's something like a CSS cache that needs to be reset. You'll notice it
 * retains the styling of the previous solution despite being explicitly reset
 * in code. I have some solutions in mind but no the time to implement.
 *
 *
 *
 */

/*
Instead of clever passing mechanisms I'm using simple page-scoped globals to
store the generated maze, start, and end points.
 */

let THE_MAZE = [];
let START_POINT = [];
let END_POINT = [];

/**
 * called by the page reset button
 */
function reset() {
    window.location.reload();
    window.fileInputForm.reset;
}
/**
 * Displays slider setting. Relies on the value box associated with the slider
 * having the same ID as the slider plus the 'Val' suffix.
 * @param slider
 */
function showSliderValue(slider) {
    sliderValID = slider.id + 'Val'; //hacky, to allow dynamic callers
    const logTarget = document.getElementById(sliderValID);
    logTarget.value = slider.value;
};

/**
 * Generator function, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
 *
 * @param n
 * @param density the odds any cell is a wall, in 10% increments
 * @returns {Generator<number, void, *>}
 */
function* getCell(n, density) {
    for (let i = 0; i < n; i++) {
        if (Math.floor(Math.random() * 100) < density){
            yield 1;
        } else {
            yield 0;
        }

    }
};

/**
 * Does initial maze generation and displays on page
 */
function generateAndDisplayMaze() {

    /**
     * Generator function, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
     *
     * @param n grid size n x n
     * @param density the odds any cell is a wall, in 10% increments
     * @returns {Generator<number[], void, *>}
     */
    function* getGrid(n, density) {
        for (let i = 0; i < n; i++) {
            yield Array.from(getCell(n, density));
        }
    };

    function randPoint(mazeSize) {
        let x = Math.floor(Math.random() * (mazeSize));
        let y = Math.floor(Math.random() * (mazeSize));
        return [x,y];
    }

    let mazeSize = document.getElementById('size').value;
    let mazeDensity = document.getElementById('density').value;
    let rawMaze = Array.from(getGrid(mazeSize, mazeDensity));
    let startPoint = randPoint(mazeSize);
    let endPoint = randPoint(mazeSize);

    //prevent duplicate start and end points
    // you have to compare the elements individually! Ugh! hours of debugging wasted.
    while  (endPoint[0] == startPoint[0] && endPoint[1] == startPoint[1]){
        endPoint = randPoint(mazeSize);
    }

    rawMaze[startPoint[0]][startPoint[1]] = 'A';
    rawMaze[endPoint[0]][endPoint[1]] = 'B';

    displayMaze(rawMaze, 'rawMaze');
    displayMaze(rawMaze, 'dfs');
    displayMaze(rawMaze, 'bfs');

    //set globals
    THE_MAZE = rawMaze;
    START_POINT = startPoint;
    END_POINT = endPoint;
};

/**
 * Displays raw results
 * There's a bug in this I still need to work out.
 *
 * @param mazeArray the maze to display
 * @param mazeId the element id to update the correct page block
 */
function displayMaze(mazeArray, mazeId) {
    const docTarget = document.getElementById(mazeId);
    docTarget.innerHTML = mazeToTable(mazeArray, mazeId);
};

/**
 * solve the depth-first-search maze
 */
function solveDFS() {

    if (THE_MAZE.length == 0){
        alert("You must first generate a maze!");
        return;
    }

    let theMaze = THE_MAZE;
    let startPoint = START_POINT;
    const docTarget = document.getElementById('dfs');

    let solved = false;

    /**
     * I'm calling this recursively, using the call stack as 'the stack'.
     *
     * @param row
     * @param column
     */
    function search(row, column) {

        let curVal = theMaze[column][row];

        if(curVal == 'B') {
            solved = true;
            return 0;

        } else if((curVal == 0 || curVal == 'A') && solved == false) {

            theMaze[column][row] = 'V';

            let idStr = 'dfs-' + column + '-' + row;

            //don't change the start point
            if(curVal != 'A'){
                    document.getElementById(idStr).style.backgroundColor = 'lightgreen';
            }

            if(column < theMaze.length - 1) {
                search( row, column + 1); //right
            }
            if(row < theMaze[column].length - 1) {
                search(row + 1, column); //down
            }
            if(column > 0) {
                search( row, column - 1); //left
            }
            if(row > 0) {
                search(row - 1, column); //up
            }
        }
    };
    search(startPoint[1], startPoint[0]);
    if(solved == false){
        alert("This maze doesn't appear to have a solution!");
    }
};

/**
 * return a blank array that mirrors the maze size
 * @returns {any[][]}
 */
function newReferenceArray() {
    return Array.from(Array(THE_MAZE.length), () =>  new Array(THE_MAZE.length).fill(0));
}

/**
 * The consensus for javascript seems to be that a queue is an 'unnecessary abstraction'
 * for most use cases, and instead an array can be used for all but very large arrays.
 *
 * The JS array has .push() to enqueue, and .shift() to pop-left or dequeue.
 *
 * For one such discussion, see:
 *
 * https://stackoverflow.com/questions/1590247/how-do-you-implement-a-stack-and-a-queue-in-javascript
 *
 *
 */
function solveBFS(){


    let theMaze = THE_MAZE;
    let startPoint = START_POINT;
    let visited = newReferenceArray();
    let queue = [];
    let solved = false;

    visited[[startPoint[0]][startPoint[1]]] = 1;
    queue.push([START_POINT]);


    while (queue.length > 0) {

        let path = queue.shift();
        let cell = path[path.length-1]; //get the last cell from the queue

        //places to check
        let check = [
            [cell[0] + 1, cell[1]], //down
            [cell[0], cell[1] + 1], //right
            [cell[0] - 1, cell[1]], //up
            [cell[0], cell[1] - 1] //left
        ];

        for (let i = 0; i < check.length; i++) {
            //check for valid points
                let r = check[i][0];
                let c = check[i][1];

            if (r < 0 || r >= theMaze.length
                || c < 0 || c >= theMaze.length
                || visited[r][c] != 0
                || theMaze[r][c] == 1) {
                continue;
            } else if ( //check the base case, solved, after points are determined valid
                theMaze[r][c] == 'B'
            ) {
                path.concat([r, c]);
                solved = true;
                return path;

            }
            visited[r][c] = 1;
            queue.push(path.concat([check[i]]));
        }
    }
    if(solved == false){
        alert("This maze doesn't appear to have a solution!");
    }
};


/**
 *  Solve via BFS and format the corresponding table
 */
function solveBFSHelper() {

    if (THE_MAZE.length == 0){
        alert("You must first generate a maze!");
        return;
    }

    let path = solveBFS();

    if(path){
        for (let i = 1; i < path.length; i++) {

            let idStr = 'bfs-' + path[i][0] + '-' + path[i][1];
            document.getElementById(idStr).style.backgroundColor = 'lightgreen';
        }
    }


};

/**
 * create an html formatted table from the maze array.
 * @param mazeArray
 * @param whichMaze
 * @returns {string}
 */
function mazeToTable(mazeArray, whichMaze){
    let tableHTML = "<table class='maze'>";

    for (let i = 0; i < mazeArray.length; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < mazeArray.length; j++) {

            switch (mazeArray[i][j]) {
                case 0:
                    classStr = " class='path'";
                    break;
                case 1:
                    classStr = " class='wall'";
                    break;
                case 'A':
                    classStr = " class='start'";
                    break;
                case 'B':
                    classStr = " class='end'";
                    break;
            }

            let idStr = " id='" + whichMaze + '-' + i + '-' + j + "' ";


            tableHTML += "<td" + idStr + classStr + ">" + mazeArray[i][j] + '</td>';
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
  return tableHTML;
};

