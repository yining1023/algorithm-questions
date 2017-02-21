Two Sum VII - Difference equals to target

Given an array of integers, find two numbers that their difference equals to a target value.
where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are NOT zero-based.

 Notice

It's guaranteed there is only one available solution

Have you met this question in a real interview? Yes
Example
Given nums = [2, 7, 15, 24], target = 5
return [1, 2] (7 - 2 = 5)

Tags 
Two Pointers Hash Table

public class Solution {
    /*
     * @param nums an array of Integer
     * @param target an integer
     * @return [index1 + 1, index2 + 1] (index1 < index2)
     */
    // hash map, 扫一遍, 分两种情况，谁-谁，min， max，最后统一+1
    // 之所以+1: your returned answers (both index1 and index2) are NOT zero-based.
    public int[] twoSum7(int[] nums, int target) {
        // write your code here
        HashMap<Integer,Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            if (map.get(target + nums[i]) != null) {
                // 把index排一下序，小的在前面
                int min = Math.min(i, map.get(target + nums[i]));
                int max = Math.max(i, map.get(target + nums[i]));
                int[] result = {min + 1, max + 1};
                return result;
            } else if (map.get(nums[i] - target) != null) {
                int min = Math.min(map.get(nums[i] - target), i);
                int max = Math.max(map.get(nums[i] - target), i);
                int[] result = {min + 1, max + 1};
                return result;
            }
            map.put(nums[i], i);
        }
        
        int[] result = {};
        return result;
    }
}
