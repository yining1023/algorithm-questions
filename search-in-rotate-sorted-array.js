// Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

// (i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).

// You are given a target value to search. If found in the array return its index, otherwise return -1.

// You may assume no duplicate exists in the array.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if (nums.length === 0 || nums === null) {
        return -1;
    }
    
    var start = 0,
        end = nums.length - 1,
        mid;
        
    while (start + 1 < end) {
        mid = start + parseInt((end - start) / 2);
        
        if (nums[mid] === target) {
            return mid;
        }

        if (nums[mid] >= nums[start]) {
            if (target >= nums[start] && target < nums[mid]) {
                end = mid;
            } else {
                start = mid;
            }
        } else {
            // think it clearly, when t is between [mid, end] => start = mid, not end = mid!!!!
            if (target <= nums[end] && target > nums[mid]) {
                start = mid;
            } else {
                end = mid;
            }
        }
    }
    
    if (nums[start] === target) {
        return start;
    }
    
    if (nums[end] === target) {
        return end;
    }
    
    return -1;
};
