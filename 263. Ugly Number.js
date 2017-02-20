263. Ugly Number

Write a program to check whether a given number is an ugly number.

Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. For example, 6, 8 are ugly while 14 is not ugly since it includes another prime factor 7.

Note that 1 is typically treated as an ugly number.

Credits:
Special thanks to @jianchao.li.fighter for adding this problem and creating all test cases.

Hide Tags Math
Hide Similar Problems (E) Happy Number (E) Count Primes (M) Ugly Number II

/**
 * @param {number} num
 * @return {boolean}
 */
var isUgly = function(num) {
    // check edge cases
    if (num <= 0 || num === null) {
        return false;
    }
    
    // check if it's 1
    if (num === 1) {
        return true;
    }
    
    // check if it's >= 2
    while (num >= 2 && num % 2 === 0) {
        num = num / 2;
    }
    
    while (num >= 3 && num % 3 === 0) {
        num = num / 3;
    }
    
    while (num >= 5 && num % 5 === 0) {
        num = num / 5;
    }

    return num === 1;
};
