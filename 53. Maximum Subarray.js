// 53. Maximum Subarray
// Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

// For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
// the contiguous subarray [4,-1,2,1] has the largest sum = 6.

// click to show more practice.

// More practice:
// If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

// Hide Company Tags LinkedIn Bloomberg Microsoft
// Hide Tags Array Dynamic Programming Divide and Conquer
// Hide Similar Problems (E) Best Time to Buy and Sell Stock (M) Maximum Product Subarray

/**
 * @param {number[]} nums
 * @return {number}
 */

// slide window!!!!
var maxSubArray = function(nums) {
    // O(n)
    if (nums === null || nums.length === 0) {
        return;
    }
    var sum = 0,
        maxSum = -Infinity;

    for (var i = 0; i < nums.length; i++) {
        sum += nums[i];
        maxSum = Math.max(maxSum, sum);
        
        // when sum < 0, reset sum, means that start from the next number, why??
        if (sum < 0) {
            sum = 0;
        }
    }
    
    return maxSum;
};
