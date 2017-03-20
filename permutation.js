// Given a collection of distinct numbers, return all possible permutations.

// For example,
// [1,2,3] have the following permutations:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// O(n!) An^n = n!
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// when to exit, when permutation.length === nums.length
// 因为顺序不同是不同结果，【1，2，3】 【1，3，2】所以不能从i+1开始选，要从头开始选，只要之前没选过就可以
// 所以也不需要startindex
var permute = function(nums) {
    let results = [];
    if (nums === null || nums.length === 0) {
        return results;
    }

    dfsHelper([], nums, results);
    return results;
}

function dfsHelper(permutation, nums, results) {
    if (permutation.length === nums.length) {
        // deep copy
        results.push(permutation.slice());
        return; // return!!
    }

    for (let i = 0; i < nums.length; i++) {
        // use indexOf to check if this number is in the array or not
        if (permutation.indexOf(nums[i]) === -1) {
            permutation.push(nums[i]);
            dfsHelper(permutation, nums, results);
            permutation.pop();
        }
    }
}


// the second time
var permute = function(nums) {
    var results = [];

    if (nums === null || nums.length === 0) {
        return results;
    }

    permuteHelper(results, [], nums);

    return results;
};

function permuteHelper(results, subset, nums) {
    for (var i = 0; i < nums.length; i++) {
    	// not going to add itself!!
        if (subset.indexOf(nums[i]) === -1) {
            subset.push(nums[i]);
            permuteHelper(results, subset, nums);
            subset.pop();
        }
    }

    // got one result
    if (subset.length === nums.length) {
        results.push(subset.slice());
    }
}
