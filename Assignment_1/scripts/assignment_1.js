/**
 * Tom Mahoney
 * CIT360
 * Assignment 1 - js
 *
 * Page is hosted and for assignment instructions see:
 *
 * https://tommaho.github.io/PCT_CIT360/Assignment_1/
 *
 */





/**
 * Selection sort algorithm.
 * @param theArray
 */
function selectionSort(theArray) {
    let smallest = 0;
    let smallestPosition = 0;
    let temp = 0;

    for (let i = 0; i < theArray.length - 1; i++) {
        smallest = theArray[i];
        smallestPosition = i;
        for (let j = i + 1; j < theArray.length; j++) {
            if (theArray[j] < smallest) {
                smallest = theArray[j];
                smallestPosition = j;
            }
        }
        temp = theArray[i];
        theArray[i] = theArray[smallestPosition];
        theArray[smallestPosition] = temp;

    }

}


/**
 * Insertion sort algorithm.
 * @param theArray
 */
function insertionSort(theArray) {
    let currentValue = 0;
    let j = 0;

    for (let i = 1; i < theArray.length; i++) {
        currentValue = theArray[i];
        j = i - 1;

        while (j >= 0 && theArray[j] > currentValue) {
            theArray[j+1] = theArray[j];
            j--;
        }
        theArray[j+1] = currentValue;
    }
}


/**
 * Bubble sort algorithm.
 * @param theArray
 */
function bubbleSort(theArray) {
    let swapped = true;
    let temp = 0;

    while (swapped){
        swapped = false;
        for (let i = 0; i < theArray.length; i++) {
            if(theArray[i] > theArray[i + 1]) {
                swapped = true;
                temp = theArray[i];
                theArray[i] = theArray[i + 1];
                theArray[i + 1] = temp;
            }
        }
    }
}

/**
 * Copied then ported to js from code shared by Dr. G.:
 *
 * @param array
 */
function quickSort(array) {
    quickSortHelper(array, 0, array.length-1);
}


/**
 * Copied then ported to js from code shared by Dr. G.:
 *
 * Using the quick sort sort alg. to sort the array values between the
 * indicated positions
 *
 * @param array
 * @param min
 * @param max
 */
function quickSortHelper(array, min, max) {
    let i = min;
    let j = max;
    let mid = (min + max)/ 2;
    let temp;

    let pivot = array[mid];

    while(i <= j) {
        while(array[i] < pivot)
            i++;
        while (array[j] > pivot)
            j--;
        if(i <= j) {
            //swap the elements
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            i++;
            j--;
        }
    }

    if(min < j)
        quickSortHelper(array, min, j);
    if(i < max)
        quickSortHelper(array, i, max);
}

/**
 * Copied then ported to js from code shared by Dr. G.:
 */
function mergeSort(array) {
    mergeSortHelper(array, 0, array.length-1);
}

/**
 * Copied then ported to js from code shared by Dr. G.:
 *
 * Merge sort the array from index low to index high
 *
 * @param array
 * @param low
 * @param high
 */
function mergeSortHelper(array, low, high) {
    if (high <= low) return;

    let mid = (low+high)/2;
    mergeSortHelper(array, low, mid);   //merge sort the left side
    mergeSortHelper(array, mid+1, high);  //merge sort the right side
    merge(array, low, mid, high);   //merge the two sorted parts together

}


/**
 * Copied then ported to js from code shared by Dr. G.:
 *
 * assuming the array parts from low to mid and from mid to high are sorted,
 * the method merger the two parts
 *
 * @param array
 * @param low
 * @param mid
 * @param high
 */
function merge(array, low, mid, high) {
    // Creating temporary subarrays
    let leftArray = []; //new int[mid - low + 1]; array lengths are default dynamic in js
    let rightArray = []; //new int[high - mid]; array lengths are default dynamic in js

    // Copying our subarrays into temporaries
    for (let i = 0; i < leftArray.length; i++)
        leftArray[i] = array[low + i];
    for (let i = 0; i < rightArray.length; i++)
        rightArray[i] = array[mid + i + 1];

    // Iterators containing current index of temp subarrays
    let leftIndex = 0;
    let rightIndex = 0;

    // Copying from leftArray and rightArray back into array
    for (let i = low; i < high + 1; i++) {
        // If there are still uncopied elements in R and L, copy minimum of the two
        if (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            if (leftArray[leftIndex] < rightArray[rightIndex]) {
                array[i] = leftArray[leftIndex];
                leftIndex++;
            } else {
                array[i] = rightArray[rightIndex];
                rightIndex++;
            }
        } else if (leftIndex < leftArray.length) {
            // If all elements have been copied from rightArray, copy rest of leftArray
            array[i] = leftArray[leftIndex];
            leftIndex++;
        } else if (rightIndex < rightArray.length) {
            // If all elements have been copied from leftArray, copy rest of rightArray
            array[i] = rightArray[rightIndex];
            rightIndex++;
        }
    }
}

/**
 * Create an array of random values <= 1000, of size 'size'.
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
 * and: https://stackoverflow.com/questions/5836833/create-an-array-with-random-values
 * @param size number of elements in array
 * @returns {number[]}
 */
function randomArray(size, max){
    return Array.from({length: size}, () => Math.floor(Math.random() * (max + 1)));
}

/**
 * called by the page reset button
 */
function reset() {
    window.location.reload();
}

function run() {

    let shortArraySize = 100;
    let longArraySize = 1000;
    let maxValue = 1000;
    let iterations = 100;

    //map is a dict-like iterable in ES6 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    let shortResultsMap = new Map();
    let shortArray = randomArray(shortArraySize, maxValue);

    document.getElementById("output").innerHTML = '';

    /*
    Notes on the code below:
        Passing as anonymous function defers execution, see:
        https://stackoverflow.com/questions/13286233/pass-a-javascript-function-as-parameter#13286241

        The .slice() method creates a shallow copy, see:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
        and
        https://stackoverflow.com/questions/51164161/spread-syntax-vs-slice-method
     */
    shortResultsMap.set("Bubble sort:", getAlgoAvgRunTime(()=>{bubbleSort(shortArray.slice())}, iterations));
    shortResultsMap.set("Selection sort:", getAlgoAvgRunTime(()=>{selectionSort(shortArray.slice())}, iterations));
    shortResultsMap.set("Insertion sort:", getAlgoAvgRunTime(()=>{insertionSort(shortArray.slice())}, iterations));
    shortResultsMap.set("Quick sort:", getAlgoAvgRunTime(()=>{quickSort(shortArray.slice())}, iterations));
    shortResultsMap.set("Merge sort:", getAlgoAvgRunTime(()=>{mergeSort(shortArray.slice())}, iterations));

    let sortedShortMap = new Map([...shortResultsMap.entries()].sort((a,b) => a[1] - b[1]));

    logResults(shortArraySize, maxValue, iterations, sortedShortMap);

    let longResultsMap = new Map();
    let longArray = randomArray(longArraySize, maxValue);

    longResultsMap.set("Bubble sort:", getAlgoAvgRunTime(()=>{bubbleSort(longArray.slice())}, iterations));
    longResultsMap.set("Selection sort:", getAlgoAvgRunTime(()=>{selectionSort(longArray.slice())}, iterations));
    longResultsMap.set("Insertion sort:", getAlgoAvgRunTime(()=>{insertionSort(longArray.slice())}, iterations));
    longResultsMap.set("Quick sort:", getAlgoAvgRunTime(()=>{quickSort(longArray.slice())}, iterations));
    longResultsMap.set("Merge sort:", getAlgoAvgRunTime(()=>{mergeSort(longArray.slice())}, iterations));


    let sortedLongMap = new Map([...longResultsMap.entries()].sort((a,b) => a[1] - b[1]));

    logResults(longArraySize, maxValue, iterations, sortedLongMap);

}

/**
 * Generic algorithm timing helper.
 *
 * @param algo an anonymous function to fire when called within this function. In this case,
 *  the assignments sort algorithms.
 *  Uses performance.now for timestamping:
 *  https://developer.mozilla.org/en-US/docs/Web/API/Performance/now
 *
 * @returns {number} //time for algo to process.
 */

function getAlgoAvgRunTime(algo, iterations){ // , array){

    let runTimes = [];
    let avgRunTime = 0;

    for (let i = 0; i < iterations; i++) {

        let startTime = performance.now(); // nanosecond time
        algo(); //array);
        let endTime = performance.now();

        runTimes.push(endTime - startTime); // nanosecond time

    }

    avgRunTime = runTimes.reduce((a, b) => a + b, 0) / runTimes.length;

    return Math.floor(avgRunTime * 1000000); //convert nanoseconds to milliseconds, no decimals
}

function logResults(n, maxValue, iterations, resultMap){
    const logTarget = document.getElementById("output");

    logTarget.innerHTML += '<br>';
    logTarget.innerHTML += '<br>Array size: ' + n;
    logTarget.innerHTML += '<br>Max value: ' + maxValue;
    logTarget.innerHTML += '<br>Iterations: ' + iterations;
    logTarget.innerHTML += '<br>';


    resultMap.forEach(
            (v, k) => logTarget.innerHTML += '<br>' + k + ' ' + v + ' ms');

}