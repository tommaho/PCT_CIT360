/**
 * Tom Mahoney
 * CIT360
 * Final Assignment - js
 *
 * Page is hosted, for assignment instructions see:
 *
 * https://tommaho.github.io/PCT_CIT360/Final_Assignment/
 *
 */

//import the Graph class from graph.js
import {Graph} from "./graph.js";

/**
 * called by the page reset button
 */
function reset() {
    window.location.reload();
    window.fileInputForm.reset;
}


/**
 * Loading the file will initiate execution.
 *
 * File load adapted from https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
 */
function loadMapAndRun() {

    const [file] = document.querySelector('input[type=file]').files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {

        let parsedText = parse(reader.result)
        let controlFieldCount = 0;

        let vertices = [];
        let edges = [];
        let cases = [];

        let resultHTML = '';
        let case_count = 0; //count of cases to process

        for (let i = 0; i < parsedText.length; i++) {
            let line = parsedText[i];

            if(isControlField(line)) {
                //console.log('This looks like a control field.');
                controlFieldCount += 1;
            } else {
                switch (controlFieldCount) { //these are vertices
                    case 1: //vertices
                        vertices.push(splitVertices(line));
                        break;
                    case 2: //edges
                        edges.push(splitEdges(line));
                        break;
                    case 3:  //cases
                        cases.push(splitCases(line));
                        break;
                    default:
                        alert('Something is wrong!');
                        //something's wrong
                }
            }
         }

        let theGraph = new Graph();

        //load the vertices
        for (const loc in vertices) {
            theGraph.add_vertex(loc);
        }

        //load the edges
        for (const edge in edges) {
            let node_a = edges[edge][0];
            let node_b = edges[edge][1];

            let a_lat =  vertices[node_a][1];
            let a_lon =  vertices[node_a][2];
            let b_lat =  vertices[node_b][1];
            let b_lon =  vertices[node_b][2];

            let distance = distanceInKmBetweenEarthCoordinates(a_lat, a_lon, b_lat, b_lon); //calculate distance here

            //debug: console.log("Adding edge ", node_a, " to ", node_b, "dist: ", distance);
            theGraph.add_edge(node_a, node_b, distance);
        }

        for (const c in cases) {
            let source = cases[c][0];
            let dest = cases[c][1];
            let path = theGraph.shortest_path(source, dest);

            let source_name = vertices[source][4];
            let dest_name = vertices[dest][4];

            case_count += 1;

            resultHTML += `<p><strong>Case ${case_count}</strong>: ${source_name} to ${dest_name}:\n</p>`;

            let step_count = 0;
            for (const step in path) {
                step_count += 1;
                let step_name = vertices[path[step]][4];

                resultHTML += `<p>${step_count}. ${step_name} <!--(${path[step]}) --> </p>`

            }

            resultHTML +=`<br>This route will result in about ${theGraph.path_distance.toFixed(1)} total kilometers traveled.<br><br><br>`


        }

        displayResult(resultHTML);

    }, false);

    if (file) {
        reader.readAsText(file);
    }
};

/**
 * simply split the text. Moved to a function in case I wanted to do something
 * additional here
 * @param text
 * @returns {*}
 */
function parse(text){
    return text.split('\n');
};

/**
 * if the line has only one entry and it's a number. Note I don't explicity 'trust'
 * the control field, but loop until I hit another one. In practice I would verify
 * that the number of data records does match the control field.
 *
 * @param line
 */
function isControlField(line){
    if(line.split(',').length + line.split(' ').length > 2){
        return false;
    }
    return true;
};


/**
 * These should be comma-separated
 * @param vLine
 * @returns {*}
 */
function splitVertices(vLine){
    let entries = [];
    let raw = vLine.split(',');


    entries.push( parseInt(raw[0])); //id
    entries.push( parseFloat(raw[1])); //lat
    entries.push( parseFloat(raw[2])); //lon
    entries.push( parseFloat(raw[3])); //height
    entries.push(raw[4]); //location name

    if(raw.length !== 5){
        console.log("Problem with this entry: ", entries)
    }
    return entries;
}

/**
 * These should be space separated
 * @param vLine
 * @returns {*}
 */
function splitEdges(eLine){
    let entries = [];
    let raw = eLine.split(',');
    entries.push( parseInt(raw[0]));
    entries.push( parseInt(raw[1]));

    return entries;
}

/**
 * These case lines are formatted exactly as edge entries. Reuse.
 * @param cLine
 * @returns {*}
 */
function splitCases(cLine){
    return splitEdges(cLine);
}

/**
 * Copied from StackOverflow:
 * https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
 *
 * @param degrees
 * @returns {number}
 */
function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

/**
 *Copied from StackOverflow with a couple tweaks:
 * https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
 *
 * @param lat1
 * @param lon1
 * @param lat2
 * @param lon2
 * @returns {number}
 */
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    let earthRadiusKm = 6371;
    let dLat = degreesToRadians(lat2-lat1);
    let dLon = degreesToRadians(lon2-lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
}


/**
 * Displays results
 * @param resultHTML
 */
function displayResult(resultHTML) {

    const logTarget = document.getElementById("output");
    logTarget.innerHTML = resultHTML;


};



//turning these into modules apparently closes scope around the js file, and functions
//must be exposed to the window object to work, see:
//https://stackoverflow.com/questions/44590393/es6-modules-undefined-onclick-function-after-import
//
//In practice it's probably not the best way to do this.
//
window.loadMapAndRun = loadMapAndRun;