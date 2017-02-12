394. Decode String

Given an encoded string, return it's decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].

Examples:

s = "3[a]2[bc]", return "aaabcbc".
s = "3[a2[c]]", return "accaccacc".
s = "2[abc]3[cd]ef", return "abcabccdcdcdef".
Hide Company Tags Google
Hide Tags Depth-first Search Stack
Hide Similar Problems (H) Encode String with Shortest Length

/**
 * @param {string} s
 * @return {string}
 */
// 利用栈（Stack）数据结构。
// 当出现左括号时，将字符串压栈。
// 当出现右括号时，将字符串弹栈，加上 新的栈顶元素 * count。
// 出现字母时，当前result为字母

var decodeString = function(s) {
    let stackStr = [];
    let stackNum = [];
    let result = '';
    let i = 0;
    while (i < s.length) {
        // if it's a digit, check if it's more than 1 digit, push to stackNum
        if (Number.isInteger(parseInt(s[i]))) {
            let num = 0;
            // double digits, 12[a]
            while (i < s.length && Number.isInteger(parseInt(s[i]))) {
                num = num * 10 + (s.charAt(i) - '0');
                i++;
            }
            stackNum.push(num);
        // if it's a [, push the things before to the stack
        } else if (s[i] === '[') {
            // old letters put in, stack, last in, first out
            stackStr.push(result);
            result="";
            i++;
        } else if (s[i] === ']') {
            let str = stackStr.pop();
            let count = stackNum.pop();
            // 把results复制几遍
            for (let j = 0;j < count; j++) {
                str = str.concat(result);
            }
            // do not use JSON.stringify, it will add "/"
            result = str;
            i++;
        // if it's a letter!!!!!, add to result!
        } else {
            result += s.charAt(i++);
        }
    }
    return result;
};
