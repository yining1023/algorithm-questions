// Given a set of distinct integers, nums, return all possible subsets.

// Note: The solution set must not contain duplicate subsets.

// For example,
// If nums = [1,2,3], a solution is:

// [
//   [3],
//   [1],
//   [2],
//   [1,2,3],
//   [1,3],
//   [2,3],
//   [1,2],
//   []
// ]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// O(2^n) <= O(n*2^n)
// [1, 2, 3] 2^3 = 8 kinds of possibilities
var subsets = function(nums) {
    var results = [];

    if (nums === null) {
        return results;
    }

    // sort!! 为了避免重复
    var sortedNums = nums.sort(function(a, b) {
        return a - b;
    });
    
    // no need to var subset = [], this is clearer
    subsetHelper(results, [], 0, sortedNums);

    return results;
};

function subsetHelper(results, subset, fromIndex, nums) {
    // push subset in before for loop
    // subset is changing all the time, so use slice() to copy a new array!
    results.push(subset.slice());

    for (var i = fromIndex; i < nums.length; i++) {
        subset.push(nums[i]);
        // it's i+1 not fromIndex + 1, fromIndex will never change
        subsetHelper(results, subset, i + 1, nums);
        subset.pop();
        // push, trverse, pop, 3 steps
    }
}