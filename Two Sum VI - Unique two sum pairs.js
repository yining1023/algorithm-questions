Two Sum VI - Unique two sum pairs

Given an array of integers, find how many unique pairs in the array such that their sum is equal to a specific target number. Please return the number of pairs.

Have you met this question in a real interview? Yes
Example
Given nums = [1,1,2,45,46,46], target = 47
return 2

1 + 46 = 47
2 + 45 = 47

Tags 
Two Pointers Hash Table

public class Solution {
    /**
     * @param nums an array of integer
     * @param target an integer
     * @return an integer
     */
    public int twoSum6(int[] nums, int target) {
        // Write your code here
        if (nums == null || nums.length < 2) {
            return 0;
        }
        Arrays.sort(nums);
        int i = 0, j = nums.length - 1;
        int answer = 0;
        while (i < j) {
            if (nums[i] + nums[j] < target) {
                i++;
            } else if (nums[i] + nums[j] > target) {
                j--;
            } else {
                answer++;
                // 要继续移动i，j, 先移一步，
                i++;
                j--;
                // 要是和之前的数相同，就继续移动
                // 但是现在要再检测一次i<j
                // 有可能之前ij贴在了一起，++ --后已经i>j了，就会卡住
                while (i < j && nums[i - 1] == nums[i]) {
                    i++;
                }
                while (i < j && nums[j + 1] == nums[j]) {
                    j--;
                }
            }
        }
        return answer;
    }
}
