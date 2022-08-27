let arr = [8, 23, 1, 2, 0, 44, 16, 12, 3];


function quickSortHelper(array, min, max) {
    let i = min;
    let j = max;
    let mid = Math.floor(min + max) / 2;

    let pivot = array[mid];

    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (i > pivot) {
            j--;
        }
        if (i <= j) {
            //swap the elements
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j++;
        }
    }

    if (min < j) {
        quickSortHelper(arr, min, j);
    }
    if (i < max) {
        quickSortHelper(arr, i, max);
    }

}

function quickSort(arr){
    quickSortHelper(arr, 0, arr.length-1);
}

console.log(quickSort(arr));