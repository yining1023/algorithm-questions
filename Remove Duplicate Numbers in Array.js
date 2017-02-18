Remove Duplicate Numbers in Array

Given an array of integers, remove the duplicate numbers in it.

You should:
1. Do it in place in the array.
2. Move the unique numbers to the front of the array.
3. Return the total number of the unique numbers.

 Notice

You don't need to keep the original order of the integers.

Have you met this question in a real interview? Yes
Example
Given nums = [1,3,1,4,4,2], you should:

Move duplicate integers to the tail of nums => nums = [1,3,4,2,?,?].
Return the number of unique integers in nums => 4.
Actually we don't care about what you place in ?, we only care about the part which has no duplicate integers.

Challenge 
Do it in O(n) time complexity.
Do it in O(nlogn) time without extra space.
Tags 
Sort Hash Table

// O(n) time, O(n) space
public class Solution {
    /**
     * @param nums an array of integers
     * @return the number of unique integers
     */
    public int deduplication(int[] nums) {
        // Write your code here
        HashMap<Integer, Boolean> mp = new HashMap<Integer, Boolean>();
        for (int i = 0; i < nums.length; i++) {
            mp.put(nums[i], true);
        }
        int result = 0;
        for (Map.Entry<Integer, Boolean> entry : mp.entrySet()) {
            nums[result] = entry.getKey();
            result++;
        }
        return result;
    }
}

// O(nlogn) time, O(1) extra space
public class Solution {
    /**
     * @param nums an array of integers
     * @return the number of unique integers
     */
    public int deduplication(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }
        
        Arrays.sort(nums);

        int current = 0;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[current]) {
                // if !===, let this pos be nums[i], otherwise i++
                nums[current + 1] = nums[i];
                current++;
            }
        }
        return current + 1;
    }
}

