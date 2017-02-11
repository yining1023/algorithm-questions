167. Two Sum II - Input array is sorted

Given an array of integers that is already sorted in ascending order, find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.

You may assume that each input would have exactly one solution and you may not use the same element twice.

Input: numbers={2, 7, 11, 15}, target=9
Output: index1=1, index2=2

Hide Company Tags Amazon
Hide Tags Array Two Pointers Binary Search
Hide Similar Problems (E) Two Sum


/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
// sort 好了，就直接用2个指针，首尾向中间挪，index还有
// 不像之前的题，没有sort，就得先sort，这样index被破坏，返回不了i，j
var twoSum = function(numbers, target) {
    let answer = [];
    if (numbers === null || numbers.length < 2) {
        return answer;
    }
    let i = 0, j = numbers.length - 1;
    while (i < j) {
        if (numbers[i] + numbers[j] < target) {
            i++;
        } else if (numbers[i] + numbers[j] > target) {
            j--;
        } else {
            // index not from 0
            return [i + 1, j + 1];
        }
    }
    return answer;
};
