340. Longest Substring with At Most K Distinct Characters

Given a string, find the length of the longest substring T that contains at most k distinct characters.

For example, Given s = “eceba” and k = 2,

T is "ece" which its length is 3.

Hide Company Tags Google
Hide Tags Hash Table String
Hide Similar Problems (H) Longest Substring with At Most Two Distinct Characters (M) Longest Repeating Character Replacement

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
 
// hash + 2 pointers sliding window
// Key: letter; value: the number of occurrences.
var lengthOfLongestSubstringKDistinct = function(s, k) {
    if (s === null || s.length === 0 || k === 0) {
        return 0;
    }

    let hash = {};
    let maxLen = 0;
    // i ~ j, sliding window
    let i = 0, j = 0;
    let c;

    for (i = 0; i < s.length; i++) {
        while (j < s.length) {
            c = s.charAt(j);
            if (hash[c] !== undefined) {
                hash[c]++;
            } else {
                // before creating a new key, check if there is already enough keys, yes, then break
                if (Object.keys(hash).length === k) {
                    break;
                } else {
                    hash[c] = 1;
                }
            }
            j++;
        }
        // after break, we might get an answer
        maxLen = Math.max(maxLen, j - i);
        c = s.charAt(i);
        // 扔掉i对应的字母，window右移，// 扔掉i对应的字母在map中的记录
        if (hash[c] !== undefined) {
            if (hash[c] > 1) {
                // >1, -1
                hash[c]--;
            } else {
                // = 1, remove这个key
                delete hash[c];
            }
        }
    }
    return maxLen;
};

