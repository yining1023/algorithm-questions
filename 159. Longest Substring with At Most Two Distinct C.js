159. Longest Substring with At Most Two Distinct Characters

Given a string, find the length of the longest substring T that contains at most 2 distinct characters.

For example, Given s = “eceba”,

T is "ece" which its length is 3.

Hide Company Tags Google
Hide Tags Hash Table Two Pointers String
Hide Similar Problems (M) Longest Substring Without Repeating Characters (H) Sliding Window Maximum (H) Longest Substring with At Most K Distinct Characters

这道题给我们一个字符串，让我们求最多有两个不同字符的最长子串。
那么我们首先想到的是用哈希表来做，哈希表记录每个字符的出现次数，
然后如果哈希表中的映射数量超过两个的时候，我们需要删掉一个映射，
比如此时哈希表中e有2个，c有1个，此时把b也存入了哈希表，那么就有三对映射了，
这时我们的left是0，先从e开始，映射值减1，此时e还有1个，不删除，left自增1。
这是哈希表里还有三对映射，此时left是1，那么到c了，映射值减1，此时c映射为0，将c从哈希表中删除，
left自增1，然后我们更新结果为i - left + 1，以此类推直至遍历完整个字符串

/**
 * @param {string} s
 * @return {number}
 */
// hash map, 2 pointers sliding window
var lengthOfLongestSubstringTwoDistinct = function(s) {
    if (s === null || s.length === 0) {
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
                if (Object.keys(hash).length === 2) {
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
