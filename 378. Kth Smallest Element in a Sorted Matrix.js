378. Kth Smallest Element in a Sorted Matrix

Given a n x n matrix where each of the rows and columns are sorted in ascending order, find the kth smallest element in the matrix.

Note that it is the kth smallest element in the sorted order, not the kth distinct element.

Example:

matrix = [
   [ 1,  5,  9],
   [10, 11, 13],
   [12, 13, 15]
],
k = 8,

return 13.
Note:
You may assume k is always valid, 1 ≤ k ≤ n2.

Hide Company Tags Google Twitter
Hide Tags Binary Search Heap
Hide Similar Problems (M) Find K Pairs with Smallest Sums

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
// O(n^2lgM) time worst case, O(nlgM) time best case, where M is the range of matrix[0][0] and the last element
// sorted => possible binary search, but because cannot convert to 1d array, no order between all the rows
// so like 287. Find the Duplicate Number, 抽屉问题

// solution 1: heap in Java, bacause in js, there is no native heap data structure
// public class Solution {
//     public int kthSmallest(int[][] matrix, int k) {
//         int n = matrix.length;
//         PriorityQueue<Tuple> pq = new PriorityQueue<Tuple>();
//         for(int j = 0; j <= n-1; j++) pq.offer(new Tuple(0, j, matrix[0][j]));
//         for(int i = 0; i < k-1; i++) {
//             Tuple t = pq.poll();
//             if(t.x == n-1) continue;
//             pq.offer(new Tuple(t.x+1, t.y, matrix[t.x+1][t.y]));
//         }
//         return pq.poll().val;
//     }
// }

// class Tuple implements Comparable<Tuple> {
//     int x, y, val;
//     public Tuple (int x, int y, int val) {
//         this.x = x;
//         this.y = y;
//         this.val = val;
//     }

//     @Override
//     public int compareTo (Tuple that) {
//         return this.val - that.val;
//     }
// }

// Solution 2 : Binary Search
// The key point for any binary search is to figure out the "Search Space". For me, I think there are two kind of "Search Space" -- index and range(the range from the smallest number to the biggest number). Most usually, when the array is sorted in one direction, we can use index as "search space", when the array is unsorted and we are going to find a specific number, we can use "range".

// Let me give you two examples of these two "search space"

// index -- A bunch of examples -- https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/ ( the array is sorted)
// range -- https://leetcode.com/problems/find-the-duplicate-number/ (Unsorted Array)
// The reason why we did not use index as "search space" for this problem is the matrix is sorted in two directions, we can not find a linear way to map the number and its index.
var kthSmallest = function(matrix, k) {
    var lo = matrix[0][0],
        hi = matrix[matrix.length - 1][matrix[0].length - 1] + 1;//+1!!!!!!

    while (lo < hi) {
        let mid = lo + parseInt((hi - lo) / 2);
        let count = 0;// find how many numbers is <= than mid
        let j = matrix[0].length - 1;
        for (let i = 0; i < matrix.length; i++) {// i for each row, j starts from the last one in the row
            while (j >= 0 && matrix[i][j] > mid) j--;
            count += (j + 1);// there are j + 1 numbers that are <= mid
        }
        if (count < k) lo = mid + 1; // mid + 1!!!!!
        else hi = mid;
    }
    return lo;// return lo!!!!
};

// the solution for the "Find the Duplicate Number",
// the only difference is that instead of search in 1d array, how many numbers are smaller than mid, we search in 2d array
// var findDuplicate = function(nums) {
//     let start = 0,
//         end = nums.length - 1;

//     // start <= end!!!
//     while (start <= end) {
//         // don't forget parseInt
//         // 找到中间的index
//         let mid = parseInt(start + (end - start) / 2);
//         let count = 0;

//         // 计算总数组中有多少个数小于等于中间的index！！不是中间的那个数
//         for (let i = 0; i < nums.length; i++) {
//             if (nums[i] <= mid) {
//                 count++;
//             }
//         }
//         // 如果小于等于中间index的数量大于中间index，说明前半部分必有重复
//         if (count > mid) {
//             end = mid - 1;
//         } else {
//             // 否则后半部分必有重复
//             start = mid + 1;
//         }
//     }
//     // return start!!!
//     return start;
// };

