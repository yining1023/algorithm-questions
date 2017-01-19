// A peak element is an element that is greater than its neighbors.

// Given an input array where num[i] ≠ num[i+1], find a peak element and return its index.

// The array may contain multiple peaks, in that case return the index to any one of the peaks is fine.

// You may imagine that num[-1] = num[n] = -∞.

// For example, in array [1, 2, 3, 1], 3 is a peak element and your function should return the index number 2.

// click to show spoilers.
/**
 * @param {number[]} nums
 * @return {number}
 */

// four cases, bottom, peak, going up, going down
var findPeakElement = function(nums) {
    if (nums === null || nums.length === 0) {
        return -1;
    }
    
    // end = numd.length - 1, don'r forget to - 1!!!!!
    var start = 0,
        end = nums.length - 1,
        mid;
    
    while(start + 1 < end) {
        // parseInt use () to wrap all the numbers!!!!!
        mid = start + parseInt((end - start) / 2);
        
        if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) {
            return mid;
        // it's nums[mid], not just nums!!!!!!!
        } else if (nums[mid] > nums[mid - 1] && nums[mid] < nums[mid + 1]) {
            start = mid;
        } else if (nums[mid] < nums[mid - 1] && nums[mid] > nums[mid + 1]) {
            end = mid;
        } else {
            start = mid;
        }
    }
    
    return nums[start] - nums[end] > 0 ? start : end;
    
};
