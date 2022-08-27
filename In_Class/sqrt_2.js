/*
approximate square root of 2
 */

function sqrtOfTwo(){
    return sqrtHelper(10);

}

function sqrtHelper(count){
    if (count === 0) {
        return 1.4;
    } else {
        return 1.0 + 1.0 / (1.0 + sqrtHelper(count - 1));
    }
}

console.log("sqrt(2) = ", sqrtOfTwo())