/**
 * Tom Mahoney
 * CIT360
 * Assignment 2 - js
 *
 * Page is hosted, for assignment instructions see:
 *
 * https://tommaho.github.io/PCT_CIT360/Assignment_2/
 *
 */

/**
 * called by the page reset button
 */
function reset() {
    window.location.reload();
    window.fileInputForm.reset;
}


/**
 * Looked for an n-gram generation algo for continuous text and found inspiration from:
 * https://stackoverflow.com/questions/40763960/data-structure-for-ngrams#40765350
 *
 * @param str the string to look in
 * @param n the width, in characters, of the entries
 */
function getNGrams(str, n){

    let gram = '';
    let ngrams = new Map();
    let mostDiverse = 0;

    /*
        I allow this loop below to go 'past' the end of the string, to account for
        any edge cases where the incomplete tail is the most diverse. I think this would throw
        array out of bounds exceptions in most non-dynamic languages.
     */
    for (let i = 0; i < (str.length); i++) {
        gram = str.substring(i, i+n);

        /*
         Notes on what I'm doing below:

                I don't like calling New in a loop of indeterminate length, but
                [new Set(gram).size] *should* be immediately discarded and garbage-collected.
                I think I would have to figure out memory profiling and run a bunch of tests
                to determine if this were true in practice
                see: https://stackoverflow.com/questions/30318936/call-new-on-a-constructor-without-assigning-it-to-a-variable

                the conditional skips BOTH subsequent instances of a given gram, AND grams that are not more diverse than
                the most diverse yet found

                Don't have to worry about a tie-breaker for repeat same-diversity n-grams, when only the first-found is
                stored
         */

        let gramDiversity = new Set(gram).size; //Set operation will yield only unique values

        if (!ngrams.get(gram) && gramDiversity > mostDiverse){ //not yet stored AND more diverse, skip the rest

            ngrams.set(gram, gramDiversity);
            mostDiverse = gramDiversity;
        }
    }

    return ngrams;
};

/**
 * Sort provided map object by value, descending.
 * @param map
 * @returns {Map<unknown, unknown>} sorted map
 */
function sortNGrams(map){
    return new Map([...map.entries()].sort((a,b) => b[1] - a[1]));
};


/**
 * Loading the file will initiate execution.
 *
 * File load adapted from https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
 */
function loadFileAndRun() {

    const [file] = document.querySelector('input[type=file]').files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {

        let parsedText = parse(reader.result)

        let resultHTML = '';
        let fileHTML = ''
        let j = 1; //log counter

        for (let i = 0; i < parsedText.length; i++) {
            let n =  parseInt( parsedText[i], 10);
            let textStr = parsedText[i + 1];

            if (n && textStr) {//only proceed if these values both exist


            let result = getNGrams(textStr, n);
            let sortedResults = sortNGrams(result);

            let winner = [...sortedResults][0][0];
            let distinctN = [...sortedResults][0][1]

            fileHTML += j  + ". <p class='fileContent'>" + n + "<br>" + highlightWinner(textStr, winner) + "</p>";

            resultHTML += j  + ". The first most diverse entry is <span class='entry'>" + winner +
                "</span> with " + distinctN + " distinct values.<br>"

            j++;
            i += 1;
            }
         }

        displayFile(fileHTML);
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
 * Format text in a way that will use css to highlight the winning entry
 * @param text
 * @param winner
 * @returns {*}
 */
function highlightWinner (text, winner ){
    let winnerPos = text.indexOf(winner)

    let highlighted = text.substring(0, winnerPos) + "<span class='entry'>" +
        winner + "</span>" + text.substring(winnerPos + winner.length)

    return highlighted;
};

/**
 * Displays file content.
 * @param fileText
 */
function displayFile(fileText) {
   const content = document.querySelector('.content');

   let fileHTML = '';
   content.innerHTML = fileText;

};

/**
 * Displays results
 * @param resultHTML
 */
function displayResult(resultHTML) {

    const logTarget = document.getElementById("output");
    logTarget.innerHTML = resultHTML;


};