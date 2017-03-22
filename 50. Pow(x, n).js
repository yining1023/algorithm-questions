50. Pow(x, n)

Implement pow(x, n).

Hide Company Tags LinkedIn Google Bloomberg Facebook
Hide Tags Binary Search Math
Hide Similar Problems (E) Sqrt(x) (M) Super Pow

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
// example: Pow(x, n) = x^n = 2^7 = 2^3 * 2^3 * 2^1 = 128

// Time O(logN)
// Solution 1: let n become smaller and smaller, small enough to 0 or 1 that we can manually handle it
// Pow(x, n) = x^n = (x*x)^(n/2) or if n % 2 !== 0, x * (x*x)^(parseInt(n/2))
// 2^7 = 2*(2*2)^(3) = 2*4*(4*4)^(1) = 16 * 8 = 128
var myPow = function(x, n) {
    if (n === 0) return 1;
    if (n === 1) return x;
    if (n < 0) {
        n = n * (-1);
        x = 1 / x;
    }
    return n % 2 === 0 ? myPow(x*x, n/2) : x*myPow(x*x, parseInt(n/2));
};
// 思路2：分治递归
// recursion
// 递归公式为：x^n = x^(n/2) * x^(n/2) * x^(n%2)
// var myPow = function(x, n) {
//     if(n < 0)   {// n might be negative
//         return 1.0/myPow(x, -n);
//     }
//     if(n === 0) {
//         return 1.0;
//     }
//     if(n === 1) {
//         return x;
//     }

//     var sub = myPow(x, parseInt(n/2));// make the parameter smaller and smaller
//     return sub*sub*myPow(x, n%2);
// };
