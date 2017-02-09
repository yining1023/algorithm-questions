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
    let results = [];
    if (nums === null || nums.length === 0) {
        return results;
    }

    // have to sort, otherwise duplicates cannot be together!!!
    // give a,b in the ()
    let sortedNums = nums.sort( (a, b) => {
        return a - b;
    });

    dfsHelper(0, [], sortedNums, results);
    return results;
}

function dfsHelper(startIndex, subset, sortedNums, results) {
    // add to results!!
    results.push(subset.slice());
    // i not from 0!!! from startIndex!!!!!! won't go back to add a number
    for (let i = startIndex; i < sortedNums.length; i++) {
        if (i !== 0 && i !== startIndex && sortedNums[i - 1] === sortedNums[i]) {
            continue;
        }
        subset.push(sortedNums[i]);
        dfsHelper(i + 1, subset, sortedNums, results);
        subset.pop();
    }
}


// var subsetsWithDup = function(nums) {
//     var results = [];
//     if (nums === null) {
//         return results;
//     }
    
//     // when there are deplicate numbsers in the array, you have to sort numbers!!!
//     var sortedNums = nums.sort(function(a, b) {
//         return a - b;
//     });
    
//     subsetHelper(results, [], 0, nums);
    
//     return results;
// };

// function subsetHelper(results, subset, fromIndex, nums) {
//     results.push(subset.slice());
    
//     for (var i = fromIndex; i < nums.length; i++) {
//         // this checking has to be the first thing in the for loop, before any pushing
//         if (i !== fromIndex && nums[i] === nums[i - 1]) {
//             continue;
//         }
//         subset.push(nums[i]);
//         subsetHelper(results, subset, i + 1, nums);
//         subset.pop();
//     }
// }
