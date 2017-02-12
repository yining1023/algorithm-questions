66. Plus One

Given a non-negative integer represented as a non-empty array of digits, plus one to the integer.

You may assume the integer do not contain any leading zero, except the number 0 itself.

The digits are stored such that the most significant digit is at the head of the list.

Hide Company Tags Google
Hide Tags Array Math
Hide Similar Problems (M) Multiply Strings (E) Add Binary (M) Plus One Linked List

Example
Given [1,2,3] which represents 123, return [1,2,4].

Given [9,9,9] which represents 999, return [1,0,0,0].

// 这道题目很简单，就是考的加法进位问题
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    // +1
    let carries = 1;
    // from right to left
    for (let i = digits.length - 1; i >= 0; i--) {
        let sum = digits[i] + carries;
        digits[i] = sum % 10;
        // parseInt!!!! 不然可能为0.1
        carries = parseInt(sum / 10);
    }

    if (carries === 0) {
        return digits;
    }
    
    // 如果出现999 + 1 = 1000， 要加一位的情况
    let results = [];
    // 左起第一位放1
    results[0] = 1;
    // copy digits to 1 - digits.length + 1
    for (let j = 1; j < digits.length + 1; j++) {
        results[j] = digits[j - 1];
    }
    return results;
};
