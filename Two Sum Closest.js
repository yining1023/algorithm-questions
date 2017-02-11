Two Sum Closest

Given an array nums of n integers, find two integers in nums such that the sum is closest to a given number, target.

Return the difference between the sum of the two integers and the target.

Have you met this question in a real interview? Yes
Example
Given array nums = [-1, 2, 1, -4], and target = 4.

The minimum difference is 1. (4 - (2 + 1) = 1).

Challenge 
Do it in O(nlogn) time complexity.

Tags 
Two Pointers Sort

public class Solution {
    /**
     * @param nums an integer array
     * @param target an integer
     * @return the difference between the sum and the target
     */
    public int twoSumCloset(int[] nums, int target) {
        // Write your code here
        // 因为不需要return index，可用2 pointers做
        // 先sort,首尾指针，一边挪pointer，一边计算diff，update diff
        Arrays.sort(nums);
        int i = 0, j = nums.length - 1;
        int diff = Integer.MAX_VALUE;
        while(i < j) {
            // 不能同时挪i，j
            // < target i++; >target j--
            if (nums[i] + nums[j] < target) {
                int curDiff = Math.abs(nums[i] + nums[j] - target);
                diff = Math.min(diff, curDiff);
                i++;
            } else {
                int curDiff = Math.abs(nums[i] + nums[j] - target);
                diff = Math.min(diff, curDiff);
                j--;
            }
            
        }
        return diff;
    }
}
