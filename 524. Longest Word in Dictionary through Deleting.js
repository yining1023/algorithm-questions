524. Longest Word in Dictionary through Deleting

Given a string and a string dictionary, find the longest string in the dictionary that can be formed by deleting some characters of the given string. If there are more than one possible results, return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.

Example 1:
Input:
s = "abpcplea", d = ["ale","apple","monkey","plea"]

Output:
"apple"
Example 2:
Input:
s = "abpcplea", d = ["a","b","c"]

Output:
"a"
Note:
All the strings in the input will only contain lower-case letters.
The size of the dictionary won't exceed 1,000.
The length of all the strings in the input won't exceed 1,000.
Hide Company Tags Google
Hide Tags Two Pointers Sort

/**
 * @param {string} s
 * @param {string[]} d
 * @return {string}
 */
// two pointers 对应着找到有没有符合的string, push to possibleRes,
// loop through the possibleRes, find the best answer
// or when finding, bestRes, update it, , depends on the length, the lexicographical

// Time Complexity: O(nk), where n is the length of string s and k is the number of words in the dictionary.
var findLongestWord = function(s, d) {
    let bestD = "";

    d.forEach(dWord => {
        let j = 0;
        for (let i = 0; i < s.length; i++) {
            if (j < dWord.length && s[i] === dWord[j]) j++; // check if j < dWord.length, whenever j++,check if j < dWord.length
        }

        if (j === dWord.length && bestD.length <= dWord.length) {
            if (bestD.length < dWord.length || dWord < bestD) bestD = dWord;
        }
    });

    return bestD;
};
