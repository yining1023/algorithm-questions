415. Add Strings
Given two non-negative integers num1 and num2 represented as string, return the sum of num1 and num2.

Note:

The length of both num1 and num2 is < 5100.
Both num1 and num2 contains only digits 0-9.
Both num1 and num2 does not contain any leading zero.
You must not use any built-in BigInteger library or convert the inputs to integer directly.
Hide Company Tags Google Airbnb
Hide Tags Math
Hide Similar Problems (M) Add Two Numbers (M) Multiply Strings

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
    if (num1 === null && num2 === null) {
        return '0';
    }
    
    let i = num1.length - 1, j = num2.length - 1;
    let answer = '', carry = 0;
    while (true) {
        let number1 = i >= 0 ? num1[i] : 0;
        let number2 = j >= 0 ? num2[j] : 0;
        // parseInt from string to int!!
        sum = parseInt(number1) + parseInt(number2) + carry;
        
        // when to exit, i and j should be < 0 too, ex: 501 + 7, in the middle, sum === 0, but it should continue
        if (sum === 0 && i < 0 && j < 0) {
            break;
        }
        digit = parseInt(sum % 10);
        // parseInt!!!
        carry = parseInt(sum / 10);
        i--;
        j--;
        answer += digit;
    }
    // reverse() don't forget the bracket
    answer = answer.split('').reverse().join('');
    if (answer === '') {
        return '0';
    }
    return answer;
};

