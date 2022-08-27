/*
Reverse a string, using a divide-and-conquer algorithm
 */

function reverse(str) {
    if (str.length === 1){
        return str;
    } else {
        let mid = Math.floor(str.length / 2);
        return reverse(str.substring(mid, str.length))
            + reverse(str.substring(0, mid)); // midpoint to end then beginning to midpoing
    }
}

console.log(reverse("Bananarama"));

let n = 0;

function linttest(){
    if (n === 0){
        console.log("made it")
    }
}