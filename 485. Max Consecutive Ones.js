485. Max Consecutive Ones

Given a binary array, find the maximum number of consecutive 1s in this array.

Example 1:
Input: [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s.
    The maximum number of consecutive 1s is 3.
Note:

The input array will only contain 0 and 1.
The length of input array is a positive integer and will not exceed 10,000
Hide Company Tags Google
Hide Tags Array
Hide Similar Problems (M) Max Consecutive Ones II

/**
 * @param {number[]} nums
 * @return {number}
 */
// O(n) time
// this one is better, more staightforward
var findMaxConsecutiveOnes = function(nums) {
    if (nums === null || nums.length === 0) {
        return 0;
    }
    let count = 0;
    let res = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            count = 0;
        } else {
            count++;
            res = Math.max(count, res);//update 1 every time 1
        }
    }
    return res;
};

// need to check max in the end
var findMaxConsecutiveOnes = function(nums) {
    if (nums === null || nums.length === 0) {
        return 0;
    }
    let count = 0;
    let res = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            res = Math.max(count, res);
            count = 0;
        } else {
            count++;
        }
    }
    return Math.max(res, count); // if all 1, [1]
};

