

/**
 * called by the page reset button
 */
function reset() {
    window.location.reload();
}




//find the 5 character wide window that is the most diverse
/**
 * Looked for an n-gram generation algo for continuous text and found inspiration from:
 * https://stackoverflow.com/questions/40763960/data-structure-for-ngrams#40765350
 *
 * @param str
 * @param n
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

        if (!ngrams.get(gram) && gramDiversity > mostDiverse){

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

function main(str, n){

    //let result = getNGrams(str, n);
    //let sortedResults = sortNGrams(result);

    //console.log(sortedResults);

    //for string xyz, the most diverse n element sequence is asdfasfd, with n distinct characters
    //string and highlight??

}

/**
 * Loading the file will initiate algo execution.
 *
 * Adapted directly from https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
 */
function loadFile() {

    const [file] = document.querySelector('input[type=file]').files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // this will then display a text file

        let parsedText = parse(reader.result)

        //displayFilePreview(reader.result);

        let resultHTML = '';
        let fileHTML = ''
        let j = 1; //log counter

        for (let i = 0; i < parsedText.length; i++) {
            let n =  parseInt( parsedText[i], 10);
            let textStr = parsedText[i + 1];

            let result = getNGrams(textStr, n);
            let sortedResults = sortNGrams(result);

            let winner = [...sortedResults][0][0];
            let distinctN = [...sortedResults][0][1]

            fileHTML += j  + ". <p class='fileContent'>" + n + "<br>" + highlightWinner(textStr, winner) + "</p>";

            resultHTML += j  + ". The first most diverse entry is <span class='entry'>" + winner + "</span> with " +
                distinctN + " distinct values.<br>"

            j++;
            i += 1;
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
 * else here
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

    console.log(highlighted);

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