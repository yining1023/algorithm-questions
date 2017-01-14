// Given a collection of numbers that might contain duplicates, return all possible unique permutations.

// For example,
// [1,1,2] have the following unique permutations:
// [
//   [1,1,2],
//   [1,2,1],
//   [2,1,1]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    var results = [];
    if (nums === null || nums.length === 0) {
        return results;
    }
    
    var sortedNums = nums.sort(function(a, b) {
        return a - b;
    });
    
    permuteHelper(results, [], sortedNums, []);
    
    return results;
};

// have an array of boolean to mark if this number is visited or not
function permuteHelper(results, subset, nums, visited) {
    for (var i = 0; i < nums.length; i++) {
        // if visited, cannot be added
        
        // i cannot be 0, because it has i - 1
        // the number before it has to be not visited
        // it was visited, and then popped out, so false, means it's not in the subset currently
        // if visited === true, means the number is in the subset!!
        if (visited[i] || (i !== 0 && !visited[i - 1] && nums[i] === nums[i - 1])) {
            continue; 
        }

        visited[i] = true;
        subset.push(nums[i]);
        permuteHelper(results, subset, nums, visited);
        subset.pop();
        // after pop, change visited back to false
        visited[i] = false;
    }
    if (subset.length === nums.length) {
        results.push(subset.slice());
    }
}