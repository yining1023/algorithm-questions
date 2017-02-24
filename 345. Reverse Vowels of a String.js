345. Reverse Vowels of a String

Write a function that takes a string as input and reverse only the vowels of a string.

Example 1:
Given s = "hello", return "holle".

Example 2:
Given s = "leetcode", return "leotcede".

Note:
The vowels does not include the letter "y".

Hide Company Tags Google
Hide Tags Two Pointers String
Hide Similar Problems (E) Reverse String

/**
 * @param {string} s
 * @return {string}
 */
// two pointers
// O(n)
// indexOf
// let vowel = 'aeiouAEIOU';
var reverseVowels = function(s) {
    if (s === null || s.length === 0) {
        return s;
    }
    s = s.split('');
    let i = 0, j = s.length - 1;
    // add uppercases too!
    let vowel = 'aeiouAEIOU';
    while (i < j) {
        // check if one string has one charactor in it use indexOf
        while (i < j && vowel.indexOf(s[i]) === -1) {
            i++;
        }
        while (i < j && vowel.indexOf(s[j]) === -1) {
            j--;
        }
        // don't forget to check i < j again, use if
        if (i < j) {
            let temp = s[i];
            s[i] = s[j];
            s[j] = temp;
            i++;
            j--;
        }
    }
    s = s.join('');
    // return s!!
    return s;
};
