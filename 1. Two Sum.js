// Given an array of integers, return indices of the two numbers such that they add up to a specific target.

// You may assume that each input would have exactly one solution.

// Example:
// Given nums = [2, 7, 11, 15], target = 9,

// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    if (nums === null || nums.length === 0) {
        return [];
    }
    let hash = {};
    for (let i = 0; i < nums.length; i++) {
        let curNum = nums[i];
        // in javascript, use !== undefined to check if the key is in or not!!
        if (hash[target - curNum] !== undefined ) {
            return [hash[target - curNum], i];
        } else {
            // {key: number, value: this number's index}
            hash[curNum] = i;
        }
    }
    return [];
}

// var twoSum = function(nums, target) {
//     if (nums === null || nums.length <= 0) {
//         return [];
//     }
//     // hash is an OBJECT!!!! not array, it has keys and values!
//     // {key: sum - number, value: this number's index}
//     // find it's sum - number, return it's index too
//     var hash = {};
    
//     for (var i = 0; i < nums.length; i++) {
//         var num = nums[i];
//         if (hash[num] === undefined) {
//             hash[target - num] = i;
//         } else {
//             return [hash[num], i]
//         }
//     }
    
//     return []
// };
