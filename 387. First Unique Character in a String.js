// 387. First Unique Character in a String

// Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

// Examples:

// s = "leetcode"
// return 0.

// s = "loveleetcode",
// return 2.
// Note: You may assume the string contain only lowercase letters.

// Hide Company Tags Amazon Bloomberg Microsoft

// 这道题确实没有什么难度，我们只要用哈希表建立每个字符和其出现次数的映射，
// 然后按顺序遍历字符串，找到第一个出现次数为1的字符，返回其位置即可

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
    if (s === null || s === "") {
        return -1;
    }

    hash = {};
    for (var i = 0; i < s.length; i++) {
        if (!hash[s.charAt(i)]) {
            hash[s.charAt(i)] = 1;
        } else {
            hash[s.charAt(i)]++;
        }
    }
    
    for (var j = 0; j < s.length; j++) {
        if (hash[s.charAt(j)] === 1) {
            return j;
        }
    }
    // when didn't find anything, return -1;
    return -1;
};
