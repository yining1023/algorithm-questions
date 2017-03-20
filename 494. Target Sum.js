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
// this dfs has no subset.push()....dfs(..) subset.pop(), because no need to keep track of the subset, only care about the index




// O(ns) time, iterative DP solution using subset sum
// The unsigned right shift operator ">>>" shifts a zero into the leftmost position
// The recursive solution is very slow, because its runtime is exponential

// The original problem statement is equivalent to:
// Find a subset of nums that need to be positive, and the rest of them negative, such that the sum is equal to target

// Let P be the positive subset and N be the negative subset
// For example:
// Given nums = [1, 2, 3, 4, 5] and target = 3 then one possible solution is +1-2+3-4+5 = 3
// Here positive subset is P = [1, 3, 5] and negative subset is N = [2, 4]

// Then let's see how this can be converted to a subset sum problem:

//                   sum(P) - sum(N) = target
// sum(P) + sum(N) + sum(P) - sum(N) = target + sum(P) + sum(N)
//                       2 * sum(P) = target + sum(nums)
// So the original problem has been converted to a subset sum problem as follows:
// Find a subset P of nums such that sum(P) = (target + sum(nums)) / 2

// Note that the above formula has proved that target + sum(nums) must be even
// We can use that fact to quickly identify inputs that do not have a solution (Thanks to @BrunoDeNadaiSarnaglia for the suggestion)
// For detailed explanation on how to solve subset sum problem, you may refer to Partition Equal Subset Sum
var findTargetSumWays = function(nums, S) {
    var sum = 0;
    nums.forEach(n => { sum += n; });

    if (S > sum || (S + sum) % 2 !== 0) return 0;
    // goal: find a subset that sum = (target + total sum) / 2
    return subSet(nums, (S + sum) / 2);

    function subSet(nums, target) {
        let dp = new Array(target + 1).fill(0);//length is target + 1, not nums.length + 1
        dp[0] = 1;
        for (let i = 0; i < nums.length; i++) {
            for (let j = target; j >= nums[i]; j--) {
                dp[j] += dp[[j - nums[i]]];// j - nums[i], not target -
            }
        }
        return dp[target];
    }
};
