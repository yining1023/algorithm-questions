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
