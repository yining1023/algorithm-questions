// Given a collection of integers that might contain duplicates, nums, return all possible subsets.

// Note: The solution set must not contain duplicate subsets.

// For example,
// If nums = [1,2,2], a solution is:

// [
//   [2],
//   [1],
//   [1,2,2],
//   [2,2],
//   [1,2],
//   []
// ]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    var results = [];
    if (nums === null) {
        return results;
    }
    
    // when there are deplicate numbsers in the array, you have to sort numbers!!!
    var sortedNums = nums.sort(function(a, b) {
        return a - b;
    });
    
    subsetHelper(results, [], 0, nums);
    
    return results;
};

function subsetHelper(results, subset, fromIndex, nums) {
    results.push(subset.slice());
    
    for (var i = fromIndex; i < nums.length; i++) {
        // this checking has to be the first thing in the for loop, before any pushing
        // not the first number at this level and is the same number as the number before it
        if (i !== fromIndex && nums[i] === nums[i - 1]) {
            console.log('skip' + nums[i]);
            continue;
        }
        subset.push(nums[i]);
        subsetHelper(results, subset, i + 1, nums);
        subset.pop();
    }
}
