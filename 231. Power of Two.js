231. Power of Two

Given an integer, write a function to determine if it is a power of two.

Credits:
Special thanks to @jianchao.li.fighter for adding this problem and creating all test cases.

Hide Company Tags Google
Hide Tags Math Bit Manipulation
Hide Similar Problems (E) Number of 1 Bits (E) Power of Three (E) Power of Four

/**
 * @param {number} n
 * @return {boolean}
 */
// Method 1: Iterative
// Time complexity = O(log n) because we are / 2, / 2, / 2
// check if n can be divided by 2. If yes, divide n by 2 and check it repeatedly.
var isPowerOfTwo = function(n) {
    if (n === null || n === 0) {// 2^0 => 1, 1 return true too
        return false;
    }

    while (n % 2 === 0) {
        n /= 2;
    }

    return n === 1;
};

// Method 2: Recursive
// Time complexity = O(log n)
var isPowerOfTwo = function(n) {
    // if (n === 1 || (n > 0 && (n % 2 === 0 && isPowerOfTwo(n / 2)))) {
    //     return true;
    // }
    // return false;
    
    // shorter!
    return (n === 1 || (n > 0 && (n % 2 === 0 && isPowerOfTwo(n / 2))))
};

// Method 3: Bit operation
// Time complexity = O(1)
// If n is the power of two:

// n = 2 ^ 0 = 1 = 0b0000...00000001, and (n - 1) = 0 = 0b0000...0000.
// n = 2 ^ 1 = 2 = 0b0000...00000010, and (n - 1) = 1 = 0b0000...0001.
// n = 2 ^ 2 = 4 = 0b0000...00000100, and (n - 1) = 3 = 0b0000...0011.
// n = 2 ^ 3 = 8 = 0b0000...00001000, and (n - 1) = 7 = 0b0000...0111.
// we have n & (n-1) == 0b0000...0000 == 0

// Otherwise, n & (n-1) != 0.

// For example, n =14 = 0b0000...1110, and (n - 1) = 13 = 0b0000...1101.
var isPowerOfTwo = function(n) {
    return n > 0 && (n & (n - 1)) === 0; // n > 0
};

// Method 4: Math derivation
// Time complexity = O(1)
// Because the range of an integer = -2147483648 (-2^31) ~ 2147483647 (2^31-1), the max possible power of two = 2^30 = 1073741824.
// (1) If n is the power of two, let n = 2^k, where k is an integer.
// We have 2^30 = (2^k) * 2^(30-k), which means (2^30 % 2^k) == 0.
// (2) If n is not the power of two, let n = j*(2^k), where k is an integer and j is an odd number.
// We have (2^30 % j*(2^k)) == (2^(30-k) % j) != 0.
var isPowerOfTwo = function(n) {
    return n > 0 && Math.pow(2, 30) % n === 0;
}

// simple
// Math.pow(7, 2);    // 49
// Math.pow(7, 3);    // 343
// Math.pow(2, 10);   // 1024
// // fractional exponents
// Math.pow(4, 0.5);  // 2 (square root of 4)
// Math.pow(8, 1/3);  // 2 (cube root of 8)
