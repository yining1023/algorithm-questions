15. 3Sum

Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Note: The solution set must not contain duplicate triplets.

For example, given array S = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]
Hide Company Tags Amazon Microsoft Bloomberg Facebook Adobe Works Applications
Hide Tags Array Two Pointers
Hide Similar Problems (E) Two Sum (M) 3Sum Closest (M) 4Sum (M) 3Sum Smaller

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// O(n^2) time
// sort, for 一遍，对每个数，把后面的剩下的数做two pointers，找b+c=-a!!!
// there might be duplicates!!!
var threeSum = function(nums) {
    let results = [];
    if (nums === null || nums.length < 3) {
        return results;
    }

    // sort first
    let sortedNums = nums.sort((a, b) => {
        return a - b;
    });

    // i only needs to go to nums.length - 3
    for (let i = 0; i < sortedNums.length - 2; i++) {
        // skip duplicate triples with the same first numebr
        if (i > 0 && sortedNums[i] === sortedNums[i - 1]) {
            continue;
        }
        let left = i + 1, right = sortedNums.length - 1;
        let target = -sortedNums[i];
        twoSum(sortedNums, left, right, target, results);
    }
    return results;
};

// have a seperate function for two sum
// take the current results into it.
// -target is the first number!
function twoSum(sortedNums, left, right, target, results) {
    while (left < right) {
        if (sortedNums[left] + sortedNums[right] === target) {
            results.push([-target, sortedNums[left], sortedNums[right]]);
            left++;
            right--;

            // skip duplicate pairs with the same left or right
            // whenever left++ in a bigger while, add the bigger while's conditions
            while (left < right && sortedNums[left] === sortedNums[left - 1]) {
                left++;
            }
            while (left < right && sortedNums[right] === sortedNums[right + 1]) {
                right--;
            }
        } else if (sortedNums[left] + sortedNums[right] < target) {
            left++;
        } else {
            right--;
        }
    }
}

// var threeSum = function(nums) {
//     var result = [];

//     if(nums.length < 3){
//         return result;
//     }
//     // sort!!!!
//     nums.sort(function(a,b){return a>b ? 1 : -1;});

//     var len = nums.length;

//     for(var i = 0; i < len-2; i++){

//         if(i === 0 || nums[i] > nums[i-1]){ // very important, same as line 40, remove duplicate as 111 will only run once 1-> rather than 1 1 1
//             target = 0 - nums[i];

//             j = i + 1;
//             k = len - 1;

//             while(j < k){
//                 if(nums[j] + nums[k] === target){
//                     result.push([nums[i],nums[j],nums[k]]);
//                     j++;
//                     k--;
//                     while(j < k && nums[j] === nums[j-1]){j++;}
//                     while(j < k && nums[k] === nums[k+1]){k--;}
//                 } else if(nums[j] + nums[k] < target){
//                     j++;
//                 } else {
//                     k--;
//                 }
//             }
//         }
//         // very important, same as line 19
//         if(i < len - 1){
//             while(nums[i] === nums[i+1]){i++;}
//         }
//     }

//     return result;
// };

