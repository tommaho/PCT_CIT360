//https://leetcode.com/problems/palindrome-number/

function rev (number){

    let reversed = [];
    let curMod = 10;

    while (number > 0) {
        reversed.push(number % 10);
        number = Math.floor(number / 10);
    }

    //have length of array, indicating number of 'places'
    //need to get 100 from 3, 10 from 2, 1 from 1, etc.

    let multiplier = 1;

    for (let i = 1; i < reversed.length; i++) {
        multiplier *= 10;
    }

    let running_total = 0;

    reversed.forEach(function (e, i) {
        running_total +=  e * multiplier;
        multiplier /= 10;})

    return running_total;

}

function isPalindrome(number) {
    return  number === rev(number);
}

console.log(isPalindrome(889));
console.log(isPalindrome(246));
console.log(isPalindrome(747));