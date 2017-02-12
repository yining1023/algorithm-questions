418. Sentence Screen Fitting

Given a rows x cols screen and a sentence represented by a list of non-empty words, find how many times the given sentence can be fitted on the screen.

Note:

A word cannot be split into two lines.
The order of words in the sentence must remain unchanged.
Two consecutive words in a line must be separated by a single space.
Total words in the sentence won't exceed 100.
Length of each word is greater than 0 and won't exceed 10.
1 ≤ rows, cols ≤ 20,000.
Example 1:

Input:
rows = 2, cols = 8, sentence = ["hello", "world"]

Output: 
1

Explanation:
hello---
world---

The character '-' signifies an empty space on the screen.
Example 2:

Input:
rows = 3, cols = 6, sentence = ["a", "bcd", "e"]

Output: 
2

Explanation:
a-bcd- 
e-a---
bcd-e-

The character '-' signifies an empty space on the screen.
Example 3:

Input:
rows = 4, cols = 5, sentence = ["I", "had", "apple", "pie"]

Output: 
1

Explanation:
I-had
apple
pie-I
had--

The character '-' signifies an empty space on the screen.
Hide Company Tags Google
Hide Tags Dynamic Programming


/**
 * @param {string[]} sentence
 * @param {number} rows
 * @param {number} cols
 * @return {number}
 */
// 直接的方法是每次扫描一行，尝试能放几个，这样时间复杂度会高一点．
// 另外一种方法是把所有的字符串都加起来，组成一个句子，包含最后一个空格，
// 然后每次看如果位移一整行的距离是否正好落在这个字符串的空格位置，
// 如果不是的话就退后，直到遇到一个空格．

var wordsTyping = function(sentence, rows, cols) {
    let all = '';
    // all = the whole sentence with spce in between and in the end
    for (let j = 0; j < sentence.length; j++) {
        all = all.concat(sentence[j] + ' ');
    }

    let start = 0, len = all.length;
    // loop the row, try to take one col at one time, if all[start % len] = ' ', move on
    for (let i = 0; i < rows; i++) {
        start += cols;
        if (all[start % len] === ' ') {
            start++;
        } else {
            // otherwise, start-- until there is a space
            while (start > 0 && all[(start - 1) % len] !== ' ') {
                start--;
            }
        }
    }

    return parseInt(start / len);
};
