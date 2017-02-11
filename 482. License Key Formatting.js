482. License Key Formatting

Now you are given a string S, which represents a software license key which we would like to format. The string S is composed of alphanumerical characters and dashes. The dashes split the alphanumerical characters within the string into groups. (i.e. if there are M dashes, the string is split into M+1 groups). The dashes in the given string are possibly misplaced.

We want each group of characters to be of length K (except for possibly the first group, which could be shorter, but still must contain at least one character). To satisfy this requirement, we will reinsert dashes. Additionally, all the lower case letters in the string must be converted to upper case.

So, you are given a non-empty string S, representing a license key to format, and an integer K. And you need to return the license key formatted according to the description above.

Example 1:
Input: S = "2-4A0r7-4k", K = 4

Output: "24A0-R74K"

Explanation: The string S has been split into two parts, each part has 4 characters.
Example 2:
Input: S = "2-4A0r7-4k", K = 3

Output: "24-A0R-74K"

Explanation: The string S has been split into three parts, each part has 3 characters except the first part as it could be shorter as said above.
Note:
The length of string S will not exceed 12,000, and K is a positive integer.
String S consists only of alphanumerical characters (a-z and/or A-Z and/or 0-9) and dashes(-).
String S is non-empty.
Hide Company Tags Google

这道题让我们对注册码进行格式化，正确的注册码的格式是每四个字符后面跟一个短杠，
每一部分的长度为K，第一部分长度可以小于K，
另外，字母必须是大写的。
那么由于第一部分可以不为K，那么我们可以反过来想，我们从S的尾部往前遍历，把字符加入结果res，每K个后面加一个短杠，
那么最后遍历完再把res翻转一下即可，注意翻转之前要把结尾的短杠去掉(如果有的话)

/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function(S, K) {
    let count = 0;
    let result = '';

    for (let i = S.length - 1; i >= 0; i--) {
        if (S[i] === '-') {
            continue;
        }
        // remember to add result =, concat returns the new string!!
        let s = S[i].toUpperCase();
        result = result.concat(s);
        count++;
        // count is the number of all numbers and letters, i includes '-'
        if (count % K === 0) {
            result = result.concat('-');
        }
    }
    // 先看看结尾有没有‘-’ 在reverse!
    if (result[result.length - 1] === '-') {
        result = result.substring(0, result.length - 1);
    }
    result = result.split('').reverse().join('');
    return result;
};
