503. Next Greater Element II

Given a circular array (the next element of the last element is the first element of the array), print the Next Greater Number for every element. The Next Greater Number of a number x is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, output -1 for this number.

Example 1:
Input: [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2;
The number 2 can't find next greater number;
The second 1's next greater number needs to search circularly, which is also 2.
Note: The length of given array won't exceed 10000.

Hide Company Tags Google
Hide Tags Stack
Hide Similar Problems (E) Next Greater Element I

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// The first typical way to solve circular array problems is to extend the original array to twice length, 2nd half has the same element as first half. Then everything become simple.
// Naive by simple solution, just look for the next greater element directly. Time complexity: O(n^2).

// The second way is to use a stack to facilitate the look up. First we put all indexes into the stack, smaller index on the top. Then we start from end of the array look for the first element (index) in the stack which is greater than the current one. That one is guaranteed to be the Next Greater Element. Then put the current element (index) into the stack.
// Time complexity: O(n).

// The only difference here is that we use stack to keep the indexes of the decreasing subsequence, i from 0 to n * 2
var nextGreaterElements = function(nums) {
    if (nums === null || nums.length === 0) return nums;
    let results = new Array(nums.length).fill(-1);

    let n = nums.length;
    let indexStack = [];
    for (let i = 0; i < n * 2; i++) {
        num = nums[i % n];// i % n!!!!

        while (indexStack.length > 0 && num > nums[indexStack[indexStack.length - 1]]) {
            results[indexStack.pop()] = num;
        }

        if (i < n) indexStack.push(i);
    }

    return results;
};
