/*
docs

 */

myArray = [44, 3, 0, 93, 249, 2, 4, 5, 6, 8, 100];


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

bubbleSort(myArray);

console.log(myArray)