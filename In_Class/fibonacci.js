/**
 * a recursive fibonacci to return nth fibonacci, complexity 2^n (exponential)
 * f(1) == 1
 * f(2) == 1
 * f(n) == f(n-1) + f(n-2)
 * @param n
 */
function fibV1(n) {
    if (n == 1 || n ==2 ){
        return 1;
    } else {
        return fibV1(n - 1) + fibV1(n - 2);
    }


}

/**
 * Non-recursive fibonacci implementation, complexity O(n)
 * @param n
 * @returns {*}
 */
function fibV2 (n) {
    let arr = [];

    arr[0] = 1;
    arr[1] = 1;

    for (let i = 2; i < n; i++) {
        arr.push(arr[i -1] + arr[i - 2]);
    }

    return arr[n-1];
}

console.log(fibV1(10));

console.log(fibV2(10));