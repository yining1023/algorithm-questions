484. Find Permutation

By now, you are given a secret signature consisting of character 'D' and 'I'. 'D' represents a decreasing relationship between two numbers, 'I' represents an increasing relationship between two numbers. And our secret signature was constructed by a special integer array, which contains uniquely all the different number from 1 to n (n is the length of the secret signature plus 1). For example, the secret signature "DI" can be constructed by array [2,1,3] or [3,1,2], but won't be constructed by array [3,2,4] or [2,1,3,4], which are both illegal constructing special string that can't represent the "DI" secret signature.

On the other hand, now your job is to find the lexicographically smallest permutation of [1, 2, ... n] could refer to the given secret signature in the input.

Example 1:
Input: "I"
Output: [1,2]
Explanation: [1,2] is the only legal initial spectial string can construct secret signature "I", where the number 1 and 2 construct an increasing relationship.
Example 2:
Input: "DI"
Output: [2,1,3]
Explanation: Both [2,1,3] and [3,1,2] can construct the secret signature "DI",
but since we want to find the one with the smallest lexicographical permutation, you need to output [2,1,3]
Note:

The input string will only contain the character 'D' and 'I'.
The length of input string is a positive integer and will not exceed 10,000
Hide Company Tags Google
Hide Tags Greedy

/**
 * @param {string} s
 * @return {number[]}
 */
// For example, given IDIIDD we start with sorted sequence 1234567
// Then for each k continuous D starting at index i we need to reverse [i, i+k] portion of the sorted sequence.

// IDIIDD
// 1234567 // sorted
// 1324765 // answer

// reverse array

var findPermutation = function(s) {
    let n = s.length;
    let arr = new Array(n + 1);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = i + 1;
    }// get 1234567

    for (let j = 0; j < n; j++) {
        if (s[j] === 'D') {
            let l = j;
            while (j < n && s[j] === 'D') j++;
            let h = j;
            reverse(arr, l, h);
        }
    }

    return arr;
};

// reverse array two pointers
function reverse(arr, l, h) {
    while (l < h) {
        let temp = arr[l];
        arr[l] = arr[h];
        arr[h] = temp;
        l++;
        h--;
    }
}
