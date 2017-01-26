// 283. Move Zeroes

// Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

// For example, given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].

// Note:
// You must do this in-place without making a copy of the array.
// Minimize the total number of operations.
// Credits:
// Special thanks to @jianchao.li.fighter for adding this problem and creating all test cases.

// Hide Company Tags Bloomberg Facebook
// Hide Tags Array Two Pointers
// Hide Similar Problems (E) Remove Element

// 典型的双指针问题。

// 使用两个指针遍历数组，一个指向数值为0的元素，另一个指向数值不为0的元素，

// 在遍历的过程中，不断交换两个指针的值。

// don't care about if the number[zero] === 0
// as long as this number[nonZero] is not 0, swap it with number[zero]
var moveZeroes = function(nums) {
    if (nums === null || nums.length === 0) {
        return;
    }
    
    // two pointers, one points to 0, one to non-0
    // all starts from 0!!
    var zero = 0;
    for (var nonZero = 0; nonZero < nums.length; nonZero++) {
        // if nums[nonZero] === 0, nonZero will move to the next one, zero will stay!
        if (nums[nonZero] !== 0) {
            // no need to see if nums[zero] === 0
            // if when nums[zero] !== 0, that mean two pointers are pointing to the same number
            // swaping them won't change anything
            // swap
            var temp = nums[nonZero];
            nums[nonZero] = nums[zero];
            nums[zero] = temp;
            // two pointers will al move to the next one!
            zero++;
        }
    }
};
