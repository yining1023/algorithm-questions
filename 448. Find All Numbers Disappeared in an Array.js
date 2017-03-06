448. Find All Numbers Disappeared in an Array

Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

Find all the elements of [1, n] inclusive that do not appear in this array.

Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.

Example:

Input:
[4,3,2,7,8,2,3,1]

Output:
[5,6]
Hide Company Tags Google
Hide Tags Array
Hide Similar Problems (H) First Missing Positive (M) Find All Duplicates in an Array

/**
 * @param {number[]} nums
 * @return {number[]}
 */
// O(n) time, O(n) space, loop, save to hash, loop 1 - n, if map.has, continue, if not, push to res.
var findDisappearedNumbers = function(nums) {
    let map = new Map();
    let res = [];
    for (let i = 0; i < nums.length; i++) {
        if (map.has(nums[i])) {
            continue;
        }
        map.set(nums[i], true);
    }
    for (let j = 1; j <= nums.length; j++) { // n = nums.length
        if (map.has(j)) {
            continue;
        }
        res.push(j);
    }
    return res;
};

// sort? O(nlogn)? if !== index + 1, switch,not overwrites!// doesn't work, 3,4,5,5,6,6,7,9,9,10, will get 1, 2, 5, 8
// switch doesn't work because if 5, 5 got switched to the head, it will think there is no 5, so no switch, but mark the number
// see the solution below
// var findDisappearedNumbers = function(nums) {
//     let sortedNums = nums.sort( (a, b) => {
//         return a - b;
//     });
//     let res = [];
//     for (let i = 0; i < sortedNums.length; i++) {
//         if (sortedNums[i] === i + 1) {
//             continue;
//         } else {
//             let temp = sortedNums[sortedNums[i] - 1];
//             sortedNums[sortedNums[i] - 1] = sortedNums[i]; // -1 not + 1
//             sortedNums[i] = temp;
//         }
//     }
//     for (let i = 0; i < sortedNums.length; i++) {
//         if (sortedNums[i] !== i + 1) {
//             res.push(i + 1);
//         }
//     }
//     return res;
// };

// no extra space, O(n) time
// just mark the positions without changing values!
// cannot overwrite or switch the value, because the value contains the information we need for other numbers
// The basic idea is that we iterate through the input array and mark elements as negative using nums[nums[i] -1] = -nums[nums[i]-1]. 
// In this way all the numbers that we have seen will be marked as negative. In the second iteration, if a value is not marked as negative, it implies we have never seen that index before, so just add it to the return list.
var findDisappearedNumbers = function(nums) {
    let res = [];
    for (let i = 0 ; i < nums.length; i++) {
        if (nums[Math.abs(nums[i]) - 1] > 0) {
            nums[Math.abs(nums[i]) - 1] *= -1;
        }
    }
    for (let i = 0 ; i < nums.length; i++) {
        if (nums[i] > 0) {
            res.push(i + 1);
        }
    }
    return res;
};
