400. Nth Digit

Find the nth digit of the infinite integer sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...

Note:
n is positive and will fit within the range of a 32-bit signed integer (n < 231).

Example 1:

Input:
3

Output:
3
Example 2:

Input:
11

Output:
0

Explanation:
The 11th digit of the sequence 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... is a 0, which is part of the number 10.
Hide Company Tags Google
Hide Tags Math

/**
 * @param {number} n
 * @return {number}
 */
// The first idea is: the result will only be within 0~9, can we find a cycle?
// For input 1 to 20, the result is:
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5
// No cycle found. While we can find that digits matter! The result sequence should be like:
// 1~9: 1*9=9 in total
// 10~99: 2*90=180 in total
// 100~999: 3*900=2700 in total
// Then, 49000, 590000, k*9*10^k
// For input 12345, we have 9+180+2700<12345<9+180+2700+36000, so the corresponding number is 1000+. this level starts from 1000
// 12345-9-180-2700=9456-1=9455, 4 digits
// 9455/4 = 2363+1000=3363, 9455%4=3, so the result should be 3. For 12346: 3, for 12347: 3, for 12348: 6, for 12349: 4
// 336(12345 start from the next 3)3
// (12346)3(12347)3(12348)6(12349)4

// 1. find start from
// 2. from the start, count how many numbers, find the number
// 3. % find which digit

// The while loop takes O(log(n)) time because a number n will have at most O(log(n)) digits. 10
// Then the return statement takes O(log(n)) time to convert the number to string. 
// So total time complexity is O(log(n)), with O(log(n)) extra space for the string.

// Straight forward way to solve the problem in 3 steps:
// find the length of the number where the nth digit is from
// find the actual number where the nth digit is from
// find the nth digit and return
var findNthDigit = function(n) {
    let level = 1, range = 9;
    let startFrom = 1;
    // while (range * level < n) {
    while (n / range / level > 1) {// use division to prevent overflow
        n -= range * level;
        range *= 10;
        level++;
        startFrom *= 10;
    }
    let targetN = startFrom + parseInt((n - 1) / level); // count startFrom number, so n - 1 th number
    return parseInt(JSON.stringify(targetN).charAt((n - 1) % level)); // (n - 1) % level, not targetN % level
};
