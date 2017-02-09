39. Combination Sum

Given a set of candidate numbers (C) (without duplicates) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.

The same repeated number may be chosen from C unlimited number of times.

Note:
All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
For example, given candidate set [2, 3, 6, 7] and target 7, 
A solution set is: 
[
  [7],
  [2, 2, 3]
]
Hide Company Tags Snapchat Uber
Hide Tags Array Backtracking
Hide Similar Problems (M) Letter Combinations of a Phone Number (M) Combination Sum II (M) Combinations (M) Combination Sum III (M) Factor Combinations (M) Combination Sum IV

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    var results = [];
    if (candidates === null || candidates.length === 0) {
        return results;
    }
    // sort it first!! O(NlogN)
    const sortedCandidates = candidates.sort((a, b) => {
        return a - b;
    });
    // O depends on how many answers are there, and the length of the answers?
    dfsHelper(0, [], sortedCandidates, target, results);
    return results;
};

function dfsHelper(startIndex, combinations, sortedCandidates, target, results) {
    // when to exit
    if (target === 0) {
        // donnot forget to deep copy please....
        results.push(combinations.slice());
        return;
    }
    for (let i = startIndex; i < sortedCandidates.length; i++) {
        // when to give up the remain candidates
        if (sortedCandidates[i] > target) {
            break;
        }
        combinations.push(sortedCandidates[i]);
        // it starts from i, not 0!!! 选了这个数下次还能选这个数，但不会再选它前面的数，不然结果有重复啊
        dfsHelper(i, combinations, sortedCandidates, target - sortedCandidates[i], results);
        combinations.pop();
    }
}
// 和subset很像，但是之后从i开始，不是i+1，因为可以重复选数
// 也要排序和deep copy
// 要加上什么时候退出，什么时候不符合条件放弃

