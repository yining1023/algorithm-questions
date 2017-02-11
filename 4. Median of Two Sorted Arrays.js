4. Median of Two Sorted Arrays

There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

Example 1:
nums1 = [1, 3]
nums2 = [2]

The median is 2.0
Example 2:
nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
Hide Company Tags Google Zenefits Microsoft Apple Yahoo Dropbox Adobe
Hide Tags Binary Search Array Divide and Conquer

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
// brute force O((m + n) / 2), merge two sorted array, a part of the merge sort, until get the kth big number
// O(log(m + n)), also they are all sorted!! binary search! A[k/2 - 1] B[k/2 - 1]谁小扔掉谁，去找k-k/2的数
var findMedianSortedArrays = function(nums1, nums2) {
    const len = nums1.length + nums2.length;
    // 分一共是奇数个数还是偶数个总数
    if (len % 2 === 0) {
        return (findKth(nums1, 0, nums2, 0, parseInt(len / 2)) + findKth(nums1, 0, nums2, 0, parseInt(len / 2) + 1)) / 2;
    } else {
        return findKth(nums1, 0, nums2, 0, parseInt(len / 2) + 1); // k从1开始，第k大的数
    }
};

// find the kth largest number in A and B array
function findKth(A, A_start, B, B_start, k) {
    // if A 被删完了,返回B的从B_start开始的第k大的数
    // >= not only >
    if (A_start >= A.length) {
        return B[B_start + k - 1];
    }
    
    if (B_start >= B.length) {
        return A[A_start + k - 1];
    }

    // k = 1
    if (k === 1) {
        return Math.min(A[A_start], B[B_start]);
    }

    // 要是A不够k/2个，就是无穷大∞
    // do not forget A_start
    let keyA = A_start + parseInt(k / 2) - 1 < A.length ? A[A_start + parseInt(k / 2) - 1] : Infinity;
    let keyB = B_start + parseInt(k / 2) - 1 < B.length ? B[B_start + parseInt(k / 2) - 1] : Infinity;
    
    if (keyA < keyB) {
        return findKth(A, A_start + parseInt(k / 2), B, B_start, k - parseInt(k / 2));
    } else {
        return findKth(A, A_start, B, B_start + parseInt(k / 2), k - parseInt(k / 2));
    }
}

