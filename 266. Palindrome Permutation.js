266. Palindrome Permutation

Given a string, determine if a permutation of the string could form a palindrome.

For example,
"code" -> False, "aab" -> True, "carerac" -> True.

Hint:

Consider the palindromes of odd vs even length. What difference do you notice?
Count the frequency of each character.
If each character occurs even number of times, then it must be a palindrome. How about character which occurs odd number of times?
Hide Company Tags Google Uber Bloomberg
Hide Tags Hash Table
Hide Similar Problems (M) Longest Palindromic Substring (E) Valid Anagram (M) Palindrome Permutation II (E) Longest Palindrome


/**
 * @param {string} s
 * @return {boolean}
 */
// 1. count the frequency of each character
// 2. loop the hash map, count the odd frequency
// 3. return true if odd frequency === 0 / 1
var canPermutePalindrome = function(s) {
    if (s === null || s.length === 0) {
        return false;
    }
    
    let hashMap = {};
    for (let i = 0; i < s.length; i++) {
        // initailize hashMap!!
        // if it's undefined, give it a default value 0
        hashMap[s.charAt(i)] = hashMap[s.charAt(i)] || 0;
        hashMap[s.charAt(i)]++;
    }
    
    let oddCount = 0;
    // for loop the hashMap, j is the key in the hashmap
    for (j in hashMap) {
        if (hashMap[j] % 2 !== 0) {
            oddCount++;
        }
    }
    
    return oddCount < 2;
}

// var canPermutePalindrome = function(s) {
//     var countMap = {};
    
//     for(var i = 0; i < s.length; i++) {
//         var c = s[i];
        
//         countMap[c] = countMap[c] || 0;
//         countMap[c]++;
//     }
//     var oddCount = 0;
    
//     for(i in countMap) {
//         if(countMap[i]%2 === 1) {
//             oddCount++;
//         }
//     }
    
//     return oddCount < 2;
// };
