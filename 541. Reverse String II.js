541. Reverse String II

Given a string and an integer k, you need to reverse the first k characters for every 2k characters counting from the start of the string. If there are less than k characters left, reverse all of them. If there are less than 2k but greater than or equal to k characters, then reverse the first k characters and left the other as original.
Example:
Input: s = "abcdefg", k = 2
Output: "bacdfeg"
Restrictions:
The string consists of lower English letters only.
Length of the given string and k will in the range [1, 10000]
Hide Company Tags Google
Hide Tags String
Hide Similar Problems (E) Reverse String

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
// O(n/2k * k) => O(n)
// worst case, k = 1, O(n / 2)
var reverseStr = function(s, k) {
    s = s.split("");
    let m = 0, len = s.length;
    while (m < len) {
        let end = Math.min(m + k - 1, len - 1);
        // index = m + k - 1
        //if there is not enough k element, reverse all of them, take len - 1,
        reverseK(s, m, end);
        m += 2 * k;// change while parameter
    }
    s = s.join("");
    return s;
};

function reverseK(s, startIndex, endIndex) {
    let i = startIndex, j = endIndex;
    while (i < j) {
        let temp = s[i];
        s[i] = s[j];
        s[j] = temp;
        i++;//remember to change i and j
        j--;
    }
}
