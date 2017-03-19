494. Target Sum

You are given a list of non-negative integers, a1, a2, ..., an, and a target, S. Now you have 2 symbols + and -. For each integer, you should choose one from + and - as its new symbol.

Find out how many ways to assign symbols to make sum of integers equal to target S.

Example 1:
Input: nums is [1, 1, 1, 1, 1], S is 3.
Output: 5
Explanation:

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3

There are 5 ways to assign symbols to make the sum of nums be target 3.
Note:
The length of the given array is positive and will not exceed 20.
The sum of elements in the given array will not exceed 1000.
Your output answer is guaranteed to be fitted in a 32-bit integer.
Hide Company Tags Google Facebook
Hide Tags Depth-first Search Dynamic Programming
Hide Similar Problems (H) Expression Add Operators

/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
// O(2^n) possible ways
// find all possible solustions, dfs, stack, recursion,definition, take subset (starts with xxx), find all possible subset and store them into results, push... dfs(...) pop
// DFS O(2^n) time too slow
// so use a map['index -> sum'] = possible results,
// means been here before, with the same sum same index, got x answers, return it
var findTargetSumWays = function(nums, S) {
    if (nums === null || nums.length === 0) return 0;

    var map = new Map();

    return dfsHelper(0, 0, map);// can be duplicates, so no need for sort

    function dfsHelper(index, sum, map) {
        let encodeString = index + '->' + sum;

        if (map.has(encodeString)) return map.get(encodeString);

        // when got all numbers in nums, how to check if got all number, the length of the subset, the index!!
        if (index === nums.length) {
            if (sum === S)
                return 1;
            else
                return 0;// else cannot be outside, only return 0, when it reaches the last number and it !=== S
        }

        let add = dfsHelper(index + 1, sum + nums[index], map);
        let minus = dfsHelper(index + 1, sum - nums[index], map);

        map.set(encodeString, add + minus);
        return add + minus;
    }
};
