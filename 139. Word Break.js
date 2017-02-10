139. Word Break

Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words. You may assume the dictionary does not contain duplicate words.

For example, given
s = "leetcode",
dict = ["leet", "code"].

Return true because "leetcode" can be segmented as "leet code".

UPDATE (2017/1/4):
The wordDict parameter had been changed to a list of strings (instead of a set of strings). Please reload the code definition to get the latest changes.

Hide Company Tags Google Uber Facebook Amazon Yahoo Bloomberg Pocket Gems
Hide Tags Dynamic Programming
Hide Similar Problems (H) Word Break II

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// dp
// O(N * L * L + M) L: s.length, M = numbers of words in the dict
var wordBreak = function(s, wordDict) {
    if (wordDict === null || wordDict.size === 0) {
        return false;
    }
    
    var possible = [];
    possible[0] = true;
    
    for (var i = 0; i < s.length; i++) {
    	// possible[i]===true表示前面是一个词了，才会进来 不然不进来
        if (possible[i]) {
            // j 从 i之后再开始，不从1开始！！
            for (var j = i + 1; j <= s.length; j++) {
                var subStr = s.substring(i, j);
                if (wordDict.indexOf(subStr) !== -1) {
                    possible[j] = true;
                }
            }
        }
    }
    return possible[s.length] === true;
};

// var wordBreak = function(s, wordDict) {
//     if(wordDict === null || wordDict.size === 0) {
//         return false;
//     }
  
//     var possible = [];
//     possible[0] = true;
    
//     for(var i = 0; i < s.length; i++) {
//         if(possible[i]) {
//             for(var j = i + 1; j <= s.length; j++) {
//                 var str = s.substring(i, j);
//                 if(wordDict.indexOf(str) !== -1) {
//                     possible[j] = true;
//                 }
//             }
//         }
//     }
    
//     return possible[s.length] === true;
// };

