215. Kth Largest Element in an Array

Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

For example,
Given [3,2,1,5,6,4] and k = 2, return 5.

Note: 
You may assume k is always valid, 1 ≤ k ≤ array's length.

Credits:
Special thanks to @mithmatt for adding this problem and creating all test cases.

Hide Company Tags Facebook Amazon Microsoft Apple Bloomberg Pocket Gems
Hide Tags Heap Divide and Conquer
Hide Similar Problems (M) Wiggle Sort II (M) Top K Frequent Elements (E) Third Maximum Number

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 1. quick sort, O(nlogn), find the kth element
// 2. quick select, O(n)
// O(n) time!!!!, O(1) extra memory.
// quick sort, partition, 再去其中一半找！
// T(N) = O(N/2) + O(N) = .... = O(2N - 1) = O(N)
var findKthLargest = function(nums, k) {
    if(nums === null || nums.length === 0 || k <= 0) {
        return 0;
    }
    return quickSelect(nums, 0, nums.length - 1, k);
};

// quickSelect find the kth largest number!!! if > pivot, to left, < pivot, go to right
function quickSelect(nums, start, end, k) {
    if (start === end) { // found it!
        return nums[start];
    }

    let pivot = nums[parseInt(start + (end - start) / 2)];
    let left = start, right = end;

    while (left <= right) {
        while (left <= right && nums[left] > pivot) {
            left++;
        }
        while (left <= right && nums[right] < pivot) {
            right--;
        }
        if (left <= right) {
            let temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
    }
    if (start + k - 1 <= right) { // on the left
        return quickSelect(nums, start, right, k);
    }
    if (start + k - 1 >= left) { // on the right
        return quickSelect(nums, left, end, k - (left - start));
    }
    return nums[right + 1]; // between right and left
}

