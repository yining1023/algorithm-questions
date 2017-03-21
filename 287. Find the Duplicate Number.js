287. Find the Duplicate Number

Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

Note:
You must not modify the array (assume the array is read only).
You must use only constant, O(1) extra space.
Your runtime complexity should be less than O(n2).
There is only one duplicate number in the array, but it could be repeated more than once.
Credits:
Special thanks to @jianchao.li.fighter for adding this problem and creating all test cases.

Hide Company Tags Bloomberg
Hide Tags Binary Search Array Two Pointers
Hide Similar Problems (H) First Missing Positive (E) Single Number (M) Linked List Cycle II (E) Missing Number

var findDuplicate = function(nums) {
    let start = 0,
        end = nums.length - 1;

    // start <= end!!!
    while (start <= end) {
        // don't forget parseInt
        // 找到中间的index
        let mid = parseInt(start + (end - start) / 2);
        let count = 0;

        // 计算总数组中有多少个数小于等于中间的index！！不是中间的那个数
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] <= mid) {
                count++;
            }
        }
        // 如果小于等于中间index的数量大于中间index，说明前半部分必有重复
        if (count > mid) {
            end = mid - 1;
        } else {
            // 否则后半部分必有重复
            start = mid + 1;
        }
    }
    // return start!!!
    return start;
};

哈希表法
复杂度
时间 O(N) 空间 O(N)

思路
遍历数组时，用一个集合记录已经遍历过的数，如果集合中已经有了说明是重复。但这样要空间，不符合。

暴力法
复杂度
时间 O(N^2) 空间 O(1)

思路
如果不用空间的话，最直接的方法就是选择一个数，然后再遍历整个数组看是否有跟这个数相同的数就行了。

排序法
复杂度
时间 O(NlogN) 空间 O(1)

思路
更有效的方法是对数组排序，这样遍历时遇到前后相同的数便是重复，但这样要修改原数组，不符合要求。

二分法
复杂度
时间 O(NlogN) 空间 O(1)

思路
实际上，我们可以根据抽屉原理简化刚才的暴力法。我们不一定要依次选择数，然后看是否有这个数的重复数，我们可以用二分法先选取n/2，按照抽屉原理，整个数组中如果小于等于n/2的数的数量大于n/2，说明1到n/2这个区间是肯定有重复数字的。比如6个抽屉，如果有7个袜子要放到抽屉里，那肯定有一个抽屉至少两个袜子。这里抽屉就是1到n/2的每一个数，而袜子就是整个数组中小于等于n/2的那些数。这样我们就能知道下次选择的数的范围，如果1到n/2区间内肯定有重复数字，则下次在1到n/2范围内找，否则在n/2到n范围内找。下次找的时候，还是找一半。

注意
我们比较的mid而不是nums[mid]!!!!!!
因为mid是下标，所以判断式应为cnt > mid，最后返回min
代码
public class Solution {
    public int findDuplicate(int[] nums) {
        int min = 0, max = nums.length - 1;
        while(min <= max){
            // 找到中间那个数
            int mid = min + (max - min) / 2;
            int cnt = 0;
            // 计算总数组中有多少个数小于等于中间数
            for(int i = 0; i < nums.length; i++){
                if(nums[i] <= mid){
                    cnt++;
                }
            }
            // 如果小于等于中间数的数量大于中间数，说明前半部分必有重复
            if(cnt > mid){
                max = mid - 1;
            // 否则后半部分必有重复
            } else {
                min = mid + 1;
            }
        }
        return min;
    }
}
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
    var start = 0, end = nums.length - 1;

    while (start <= end) {
        // 找到中间那个数
        var mid = parseInt(start + (end - start) / 2);

        // 计算总数组中有多少个数小于等于中间数
        var count = 0;
        for (var i = start; i < end; i++){
            if (nums[i] <= mid){
                count++;
            }
        }

        // 如果小于等于中间数的数量大于中间数，说明前半部分必有重复
        if(count > mid){
            end = mid - 1;
        // 否则后半部分必有重复
        } else {
            start = mid + 1;
        }
    }
    return start;
};

// This solution is based on binary search.

// At first the search space is numbers between 1 to n. Each time I select a number mid (which is the one in the middle) and count all the numbers equal to or less than mid. Then if the count is more than mid, the search space will be [1 mid] otherwise [mid+1 n]. I do this until search space is only one number.

// Let's say n=10 and I select mid=5. Then I count all the numbers in the array which are less than equal mid. If the there are more than 5 numbers that are less than 5, then by Pigeonhole Principle (https://en.wikipedia.org/wiki/Pigeonhole_principle) one of them has occurred more than once. So I shrink the search space from [1 10] to [1 5]. Otherwise the duplicate number is in the second half so for the next step the search space would be [6 10].


// Solution with O(n) time and O(1) space without modifying the array.
// O(N) time
// The main idea is the same with problem Linked List Cycle II,https://leetcode.com/problems/linked-list-cycle-ii/. Use two pointers the fast and the slow. The fast one goes forward two steps each time, while the slow one goes only step each time. They must meet the same item when slow==fast. In fact, they meet in a circle, the duplicate number must be the entry point of the circle when visiting the array from nums[0]. Next we just need to find the entry point. We use a point(we can use the fast one before) to visit form begining with one step each time, do the same job to slow. When fast==slow, they meet at the entry point of the circle. The easy understood code is as follows.
// same with find the cycle entry
var findDuplicate = function(nums) {
    var slow = nums[0],
        fast = nums[nums[0]];

    while (fast !== slow) {
        slow = nums[slow];
        fast = nums[nums[fast]];
    }

    fast = 0;
    while(fast !== slow) {
        slow = nums[slow];
        fast = nums[fast];
    }
    if (fast === slow) {
        return slow;
    }
    return -1;
};
