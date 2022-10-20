/**
 * Tom Mahoney
 * CIT360
 * Assignment 3 - js
 *
 * Page is hosted, for assignment instructions see:
 *
 * https://tommaho.github.io/PCT_CIT360/Assignment_3/
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
    let x = Math.floor(Math.random() * mazeSize);
    let y = Math.floor(Math.random() * mazeSize);
    return [x,y];
}

function generateMaze() {
    let mazeSize = document.getElementById('size').value;
    let mazeDensity = document.getElementById('density').value;
    let rawMaze = Array.from(getGrid(mazeSize, mazeDensity));
    let startPoint = randPoint(mazeSize);
    let endPoint = randPoint(mazeSize);

    rawMaze[startPoint[0]][startPoint[1]] = 'A';
    rawMaze[endPoint[0]][endPoint[1]] = 'B';

    displayMaze(rawMaze, 'rawMaze');
    displayMaze(rawMaze, 'dfs');
    displayMaze(rawMaze, 'bfs');

    //set globals
    THE_MAZE = rawMaze;
    START_POINT = startPoint;
    END_POINT = endPoint;
    //console.table(rawMaze);
};

/**
 * Displays raw results
 * @param mazeArray the maze to display
 * @param mazeId the element id to update the correct page block
 */
function displayMaze(mazeArray, mazeId) {
    const docTarget = document.getElementById(mazeId);
    docTarget.innerHTML = mazeToTable(mazeArray, mazeId);
};

function solveDFS() {

    let theMaze = THE_MAZE;
    let startPoint = START_POINT;
    const docTarget = document.getElementById('dfs');

    let solved = false;

    /**
     * I'm calling this recursively, using the call stack as the stack.
     *
     *
     * @param row
     * @param column
     */
    function search(row, column) {

        let curVal = theMaze[column][row];

        if(curVal == 'B') {
            //console.log("Solved at (" + column + ", " + row + ")"); //debug
            solved = true;
            return 0;

        } else if((curVal == 0 || curVal == 'A') && solved == false) {

            //console.log("At position (" + column + ", " + row + ")");

            theMaze[column][row] = 'V';

            let idStr = 'dfs-' + column + '-' + row;

            //don't change the start point
            if(curVal != 'A'){
                setInterval(() => {
                    document.getElementById(idStr).style.backgroundColor = 'lightgreen';
                }, 1000);
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

    //console.log(startPoint); //debug

    search(startPoint[1], startPoint[0]);
};


function solveBFS() {

    let theMaze = THE_MAZE;
    let startPoint = START_POINT;
    const docTarget = document.getElementById('dfs');
    let solved = false;

    console.log('solving BFS.');



};


    //console.table(visited)
    //
    // path.push(startPoint);
    //
    // while(path.length > 0){
    //
    //     let current = path.pop();
    //
    //     //console.log(theMaze[current[0]][current[1]]);
    //
    //     if (theMaze[current[0]][current[1]] == 'B'){ //if current == the end, it's solved
    //         console.log('Solved!');
    //     } else {
    //
    //
    //     }
    //
    // }





function mazeToTable(mazeArray, whichMaze){
    let tableHTML = "<table class='maze'>";

    for (let i = 0; i < mazeArray.length; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < mazeArray.length; j++) {

            switch (mazeArray[i][j]) {
                case 0:
                    classStr = " class='path' ";
                    break;
                case 1:
                    classStr = " class='wall' ";
                    break;
                case 'A':
                    classStr = " class='start' ";
                    break;
                case 'B':
                    classStr = " class='end' ";
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