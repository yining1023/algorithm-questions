459. Repeated Substring Pattern

Given a non-empty string check if it can be constructed by taking a substring of it and appending multiple copies of the substring together. You may assume the given string consists of lowercase English letters only and its length will not exceed 10000.

Example 1:
Input: "abab"

Output: True

Explanation: It's the substring "ab" twice.
Example 2:
Input: "aba"

Output: False
Example 3:
Input: "abcabcabcabc"

Output: True

Explanation: It's the substring "abc" four times. (And the substring "abcabc" twice.)
Hide Company Tags Amazon Google
Hide Tags String
Hide Similar Problems (E) Implement strStr()


/**
 * @param {string} s
 * @return {boolean}
 */
// The length of the repeating substring must be a divisor of the length of the input string
// Search for all possible divisor of str.length, starting for length/2
// If i is a divisor of length, repeat the substring from 0 to i the number of times i is contained in s.length
// If the repeated substring is equals to the input str return true

// I beleive it would have to be worst case O(n^2). 
// The worst case scenario for divisor would be n. 
// divisor = len/strpos right? So when strpos = 1, divisor = len/1 => divisor = len. 
// So when divisor == n we have an O(n^2) worst case runtime.

// quicker, don't form the new string, just compare each segment with sub
var repeatedSubstringPattern = function(s) {
  if (s === null) {
      return false;
  }
  
  for (let i = parseInt(s.length / 2); i >= 1; i--) {// i starts from 1 when i = 0, x / (0+1) === 0
      if (s.length % i === 0) {
          let sub = s.substring(0, i);
          let num = parseInt(s.length / i); // parseInt!
          let j = 1;
          for (j = 1; j <= num; j++) {
              if (s.substring((j - 1) * i, j * i) !== sub) {
                  break;
              }
          }
          if (j === num + 1) {
              return true;
          }
      }
  }
  
  return false;
};
// var repeatedSubstringPattern = function(s) {
//   if (s === null) {
//       return false;
//   }
  
//   for (let i = parseInt(s.length / 2); i >= 1; i--) {// i starts from 1 when i = 0, x / (0+1) === 0
//       if (s.length % i === 0) {
//           let sub = s.substring(0, i);
//           let num = parseInt(s.length / i); // parseInt!
//           let newS = '';

//           for (let j = 0; j < num; j++) {
//               newS = newS.concat(sub);
//           }

//           if (newS === s) {
//               return true;
//           }
//       }
//   }
  
//   return false;
// };
