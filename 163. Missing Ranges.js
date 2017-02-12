163. Missing Ranges

Given a sorted integer array where the range of elements are in the inclusive range [lower, upper], return its missing ranges.

For example, given [0, 1, 3, 50, 75], lower = 0 and upper = 99, return ["2", "4->49", "51->74", "76->99"].

Hide Company Tags Google
Hide Tags Array
Hide Similar Problems (M) Summary Ranges

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
// 2 pointers!!!!, prev, curt!
var findMissingRanges = function(nums, lower, upper) {
    // 初始化prev为lower-1，判断是否存在“第一个”区间
    let prev = lower - 1, curt = 0;
    let results = [];

    for (let i = 0; i <= nums.length; i++) {
        // 当遍历到length时，设置curr为upper+1，判断是否存在“最后一个”区间
        curt = (i === nums.length) ? upper + 1 : nums[i];
        // 如果上一个数和当前数相差大于1，说明之间有区间
        if (curt - prev > 1) {
            results.push(getRange(prev + 1, curt - 1));
        }
        prev = curt;
    }
    return results;
};

function getRange(from, to) {
    return from === to ? JSON.stringify(from) : from + '->' + to;
}
