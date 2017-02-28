268. Missing Number

Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

For example,
Given nums = [0, 1, 3] return 2.

Note:
Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?

Credits:
Special thanks to @jianchao.li.fighter for adding this problem and creating all test cases.

Hide Company Tags Microsoft Bloomberg
Hide Tags Array Math Bit Manipulation
Hide Similar Problems (H) First Missing Positive (E) Single Number (M) Find the Duplicate Number


/**
 * @param {number[]} nums
 * @return {number}
 */
// O(N)
// 1. XOR
// The basic idea is to use XOR operation. We all know that a^b^b =a, which means two xor operations with the same number will eliminate the number and reveal the original number.
// In this solution, I apply XOR operation to both the index and value of the array. In a complete array with no missing numbers, the index and value should be perfectly corresponding( nums[index] = index), so in a missing array, what left finally is the missing number.
// Given nums = [0, 1, 3] return 2.
// 0 ^ 1 ^ 2 (index)
// 0 ^ 1 ^ 3 ^ 3(length) => 2
var missingNumber = function(nums) {
    let xor = 0;
    for (let i = 0; i < nums.length; i++) {
        xor = xor ^ i ^ nums[i];
    }
    return xor ^ nums.length;
};

// O(N)
// 2.SUM
var missingNumber = function(nums) {
    let sumOfN = 0, sumOfN1 = 0;
    for (let i = 0; i < nums.length; i++) {
        sumOfN += nums[i];
        sumOfN1 += i;
    }
    return sumOfN1 + nums.length - sumOfN;
    // sumOfN1 += nums.length;
    // return sumOfN1 - sumOfN;
};

// O(N)
// 2.1 SUM, use n*(n+1)/2 get the sum of n + 1, 0 + 1 + 2 + 3 + ... + n
var missingNumber = function(nums) {
    let len = nums.length;
    let sumOfN1 = len * (len + 1) / 2;
    for (let i = 0; i < nums.length; i++) {
        sumOfN1 -= nums[i];
    }
    return sumOfN1;
};

// O(N)
// 2.2 SUM if n it too large, add one, subtracte one?
var missingNumber = function(nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum -= nums[i];
        sum += i;
    }
    return sum + nums.length;
};

// O(logN)
// 3.Binary Search
var missingNumber = function(nums) {
    nums = nums.sort((a, b) => {return a - b;}); // sort first!
    let start = 0, end = nums.length; // length, not length - 1
    while (start < end) {
        mid = start + parseInt((end - start) / 2); // parse Int!!!
        if (nums[mid] > mid) {
            end = mid;
        } else {
            start = mid + 1;// make one example to find out if + 1 or not
        }
    }
    return start;
};




// var missingNumber = function(nums) {
//     var res = 0;
    
//     // nums = [0, 1, 3, 4, 5]
//     // index go from 1 to 5
//     // res starts with 0
//     // perform xor so that index and num will cancel out leaving the odd num alone
//     for(var i = 1; i <= nums.length; i++) {
//         res = res ^ i ^ nums[i - 1];
//     }
 
//     return res;
// };

// var missingNumber = function(nums) {
//     // write your code here
//     var n = nums.length, i = 0;
//     while (i < n) {
//         // 如果!== 它自己的index，就和用自己的值当index的那个点调换
//         while (nums[i] !== i && nums[i] < n) {
//             var t = nums[i];
//             nums[i] = nums[t];
//             nums[t] = t;
//         }
//         i++;
//     }
//     for (i = 0; i < n; ++i)
//         // 看谁不等于它的index，就返回谁的index
//         if (nums[i] !== i) return i;
//     // 最后没反悔的话，返回n，只剩下n这一个数了
//     return n;
// }
