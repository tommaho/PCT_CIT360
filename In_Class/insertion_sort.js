/*

 */

function insertionSort(array){
    let currentValue = 0;
    let j = 0;

    for (let i = 0; i < array.length; i++) {    // runs n-1 times
        currentValue = array[i];
        j = i-1;

        while (j >= 0 && array[j] > currentValue ) {
            array[j+1] = array[j];
            j--;
        }
        array[j+1] = currentValue;

    }
}

myArray = [44, 3, 0, 93, 249, 2, 4, 5, 6, 8, 100];

console.log("Array before :", myArray )

insertionSort(myArray);

console.log("Array after: ", myArray)