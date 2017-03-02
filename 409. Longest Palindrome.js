409. Longest Palindrome

Given a string which consists of lowercase or uppercase letters, find the length of the longest palindromes that can be built with those letters.

This is case sensitive, for example "Aa" is not considered a palindrome here.

Note:
Assume the length of given string will not exceed 1,010.

Example:

Input:
"abccccdd"

Output:
7

Explanation:
One longest palindrome that can be built is "dccaccd", whose length is 7.
Hide Company Tags Google
Hide Tags Hash Table
Hide Similar Problems (E) Palindrome Permutation

/**
 * @param {string} s
 * @return {number}
 */
// O(n)
// do it only one loop, add the key, see it twice, delete it, count++;
// in the end, if map.size >= 1, add one
var longestPalindrome = function(s) {
    if (s === null || s.length === 0) {
        return 0;
    }
    
    let map = new Map();
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        if (map.has(s.charAt(i))) {
            count++;
            map.delete(s.charAt(i));
        } else {
            map.set(s.charAt(i), 1);
        }
    }
    if (map.size >= 1) {
        return count * 2 + 1;
    }
    return count * 2;
};
// O(n+k), n is the length of s, k is the length of unique characters in s
// var longestPalindrome = function(s) {
    // if (s === null || s.length === 0) {
    //     return 0;
    // }
    
//     let map = new Map();
//     for (let i = 0; i < s.length; i++) {
//         if (map.has(s.charAt(i))) {
//             map.set(s.charAt(i), map.get(s.charAt(i)) + 1);
//         } else {
//             map.set(s.charAt(i), 1);
//         }
//     }
    
//     let res = 0, numOfOne = 0;
//     map.forEach((value, key) => { // value first, key second
//         if (value % 2 === 0) {
//             res += value / 2;
//         } else if (value % 2 === 1 && value >= 3) { // 'ccc' 3 c
//             res += (value - 1) / 2;
//             numOfOne++;
//         } else { // 'a' one a
//             numOfOne++;
//         }
//     });
    
//     res *= 2; // res was the pair, *= 2 would be the total length

//     if (numOfOne >= 1) {
//         res++;
//     }
    
//     return res;
// };
