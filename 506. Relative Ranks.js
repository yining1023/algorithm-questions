506. Relative Ranks

Given scores of N athletes, find their relative ranks and the people with the top three highest scores, who will be awarded medals: "Gold Medal", "Silver Medal" and "Bronze Medal".

Example 1:
Input: [5, 4, 3, 2, 1]
Output: ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]
Explanation: The first three athletes got the top three highest scores, so they got "Gold Medal", "Silver Medal" and "Bronze Medal".
For the left two athletes, you just need to output their relative ranks according to their scores.
Note:
N is a positive integer and won't exceed 10,000.
All the scores of athletes are guaranteed to be unique.
Hide Company Tags Google

/**
 * @param {number[]} nums
 * @return {string[]}
 */
// O(nlogn) time and O(n) space
// every time when after sorting, lose original index, think about a pair[number, originalIndex], then sort by number
var findRelativeRanks = function(nums) {
    var pairs = [];
    var results = [];
    for (let i = 0; i < nums.length; i++) {
        let pair = [nums[i], i];
        pairs.push(pair);
    }
    pairs = pairs.sort((a, b) => {
        return b[0] - a[0];
    });

    for (let j = 0; j < pairs.length; j++) {
        if (j === 0) {
            results[pairs[j][1]] = ("Gold Medal"); // go to its original index
        } else if (j === 1) {
            results[pairs[j][1]] = ("Silver Medal");
        } else if (j === 2) {
            results[pairs[j][1]] = ("Bronze Medal");
        } else {
            results[pairs[j][1]] = j + 1 + ""; // j + 1, ranking starts from 1 // convert it to string + ""
        }
    }
    return results;
};
