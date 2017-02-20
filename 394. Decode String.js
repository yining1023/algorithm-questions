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
// recursion, split string by "[" call itself "]", recursion, and concat, might stack over flow, too deep
// stack
// one number stack, one string stack, one result to hold the current [...] reesult
// loop through this string:
// if a number: try find the complete digit, push into number stack
// if '[', push the old result in, reset result to ''. result might be empty if there is no ] yet, prepare to go into one level deeper, save the current level first.
// if ']', pop num, pop str, str += result x num, result = str. untangle this level!
// if a letter, push into result
var decodeString = function(s) {
    if (s === null || s.length === 0) {
        return '';
    }
    let strStack = [],
        numStack = [],
        result = '',
        i = 0;
    
    while (i < s.length) {
        if (Number.isInteger(parseInt(s[i]))) {
            let number = 0;
            // inner while has to add the condition that the outter while has
            while (i < s.length && Number.isInteger(parseInt(s[i]))) {
                number = number * 10 + (s.charAt(i) - '0');// number = number * 10 + new digit!
                i++;
            }
            numStack.push(number);//push the number in, don't leave it empty()
        } else if (s[i] === '[') {
            strStack.push(result);
            result = '';
            i++;
        } else if (s[i] === ']') {
            let string = strStack.pop();
            let count = numStack.pop();
            for (let j = 0; j < count; j++) {
                string = string.concat(result);
            }
            result = string;
            i++;
        } else {
            result += s.charAt(i);
            i++;
        }
    }
    return result;
};

利用栈（Stack）数据结构。
当出现左括号时，将字符串压栈。
当出现右括号时，将字符串弹栈，并重复响应次数，累加至新的栈顶元素。

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
