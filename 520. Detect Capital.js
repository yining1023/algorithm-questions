520. Detect Capital

Given a word, you need to judge whether the usage of capitals in it is right or not.

We define the usage of capitals in a word to be right when one of the following cases holds:

All letters in this word are capitals, like "USA".
All letters in this word are not capitals, like "leetcode".
Only the first letter in this word is capital if it has more than one letter, like "Google".
Otherwise, we define that this word doesn't use capitals in a right way.
Example 1:
Input: "USA"
Output: True
Example 2:
Input: "FlaG"
Output: False
Note: The input will be a non-empty word consisting of uppercase and lowercase latin letters.

Hide Company Tags Google
Hide Tags String

/**
 * @param {string} word
 * @return {boolean}
 */
// O(1)
var detectCapitalUse = function(word) {
    upperCase = word.toUpperCase();
    lowerCase = word.toLowerCase();
    if (upperCase === word) {
        return true;
    }
    if (lowerCase === word) {
        return true;
    }
    subWord = word.substring(1);
    lowerSubWord = subWord.toLowerCase();
    if (upperCase[0] === word[0] && lowerSubWord === subWord) {
        return true;
    }
    return false;
};

// 2. regular expression

// To get the ASCII value of a character, use the charCodeAt instance method of the String JavaScript object.
// Example:
// var s = 'A';
// console.log(s.charCodeAt(0)); // 65
// To convert an ASCII value to its corresponding character use the fromCharCode static method of the String JavaScript object.
// Example:
// console.log(String.fromCharCode(65)); // A

// The difference is 32.
// Uppercase A is ASCII value 0x41 (65 in decimal), with the last uppercase letter being 0x5A (90 in decimal).
// Lowercase a is ASCII value 0x61 (97 in decimal), with the last lowercase letter being 0x7A (122 in decimal).

