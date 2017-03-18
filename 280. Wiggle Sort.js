280. Wiggle Sort

Given an unsorted array nums, reorder it in-place such that nums[0] <= nums[1] >= nums[2] <= nums[3]....

For example, given nums = [3, 5, 2, 1, 6, 4], one possible answer is [1, 6, 2, 5, 3, 4].

Hide Company Tags Google
Hide Tags Array Sort
Hide Similar Problems (M) Sort Colors (M) Wiggle Sort II

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// it doesn't has to be 1,6,2,5,3,4, as long as small, big, small, big, small, big
// brute force, sort and then two pointers?, O(nlogn)

// O(n) time!!!!!one pass

// The final sorted nums needs to satisfy two conditions:
// If i is odd, then nums[i] >= nums[i - 1];
// If i is even, then nums[i] <= nums[i - 1].
// The code is just to fix the orderings of nums that do not satisfy 1 and 2.

// why is this greedy solution can ensure previous sequences and coming sequences W.R.T position i wiggled?
// My explanation is recursive,
// suppose nums[0 .. i - 1] is wiggled, for position i:
// if i is odd, we already have, nums[i - 2] >= nums[i - 1],
// if nums[i - 1] <= nums[i], then we does not need to do anything, its already wiggled.
// if nums[i - 1] > nums[i], then we swap element at i -1 and i. Due to previous wiggled elements (nums[i - 2] >= nums[i - 1]), we know after swap the sequence is ensured to be nums[i - 2] > nums[i - 1] < nums[i], which is wiggled.
// similarly, if i is even, we already have, nums[i - 2] <= nums[i - 1],
// if nums[i - 1] >= nums[i], pass
// if nums[i - 1] < nums[i], after swap, we are sure to have wiggled nums[i - 2] < nums[i - 1] > nums[i].
// The same recursive solution applies to all the elements in the sequence, ensuring the algo success.

var wiggleSort = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        if (i % 2 !== 0) {
            if (nums[i] < nums[i - 1]) swap(nums, i);
        } else if (i !== 0) {
            if (nums[i] > nums[i - 1]) swap(nums, i);
        }
    }
};

function swap(nums, i) {
    let temp = nums[i - 1];
    nums[i - 1] = nums[i];
    nums[i] = temp;
}
