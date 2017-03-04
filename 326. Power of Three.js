326. Power of Three

Given an integer, write a function to determine if it is a power of three.

Follow up:
Could you do it without using any loop / recursion?

Credits:
Special thanks to @dietpepsi for adding this problem and creating all test cases.

Hide Company Tags Google
Hide Tags Math
Hide Similar Problems (E) Power of Two (E) Power of Four

/**
 * @param {number} n
 * @return {boolean}
 */
// whith loop, depends on O(log(3)N)
var isPowerOfThree = function(n) {
    if (n === null || n < 1) {
        return false;
    }
    while (n % 3 === 0) {
        n /= 3;
    }
    return n === 1;
};

// without loop
// 1162261467 is 3^19,  3^20 is bigger than int, int -2^31 ~ 2^31
var isPowerOfThree = function(n) {
    // return Math.pow(3, 19) % n === 0; // -3 should be false
    return (n > 0 && Math.pow(3, 19) % n === 0);
};
