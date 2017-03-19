259. 3Sum Smaller

Given an array of n integers nums and a target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy the condition nums[i] + nums[j] + nums[k] < target.

For example, given nums = [-2, 0, 1, 3], and target = 2.

Return 2. Because there are two triplets which sums are less than 2:

[-2, 0, 1]
[-2, 0, 3]
Follow up:
Could you solve it in O(n2) runtime?

Hide Company Tags Google
Hide Tags Array Two Pointers
Hide Similar Problems (M) 3Sum (M) 3Sum Closest

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// O(n^2) time
// n times 2sum
var threeSumSmaller = function(nums, target) {
    var results = 0;
    if (nums === null || nums.length < 3) return results;

    // sort!! first
    nums = nums.sort((a, b) => { return a - b; });

    for (let i = 0; i < nums.length - 2; i++) {
        // if (i > 0 && nums[i] === nums[i - 1]) continue; // get rid of duplicates
        // twoSumSmaller(nums, i, results, i + 1, nums.length - 1, target - nums[i]);
        twoSumSmaller(i + 1, nums.length - 1, target - nums[i]);
    }

    return results;

    function twoSumSmaller(start, end, target) {
        while (start < end) {
            if (nums[start] + nums[end] >= target) end--;
            else {
                // all possible results, [i, start, end],[i, start, end - 1]....[i, start, start + 1]
                results += (end - start);
                start++;
                // while (start < end && nums[start] === nums[start - 1]) start++; //skip duplicates
                // this question doesn't require remove duplicates!!!
            }
        }
    }
};

// to be safe, put all sub function into the bigger function
