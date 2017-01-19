// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).

// Find the minimum element.

// You may assume no duplicate exists in the array.

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    // the first number <= the last number in the array
    if (nums === null || nums.length === 0) {
        return -1;
    }
    
    var start = 0,
        end = nums.length - 1,
        mid;
    
    while (start + 1 < end) {
        // don't forget parseInt, index has to be an integer
        mid = start + parseInt((end - start) / 2);
        // not mid <=, it's nums[mid]!!! compare the actual number please, not the index
        if (nums[mid] <= nums[nums.length - 1]) {
            end = mid
        } else {
            start = mid;
        }
    }
    
    // not <= mid, it's <= TARGET!!! <= nums[nums.length - 1]
    if (nums[start] <= nums[nums.length - 1]) {
        return nums[start];
    }
    
    if (nums[end] <= nums[nums.length - 1]) {
        return nums[end];
    }
    
    return -1;
};
