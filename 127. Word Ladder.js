127. Word Ladder

Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:

Only one letter can be changed at a time.
Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
For example,

Given:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]
As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
return its length 5.

Note:
Return 0 if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.
UPDATE (2017/1/20):
The wordList parameter had been changed to a list of strings (instead of a set of strings). Please reload the code definition to get the latest changes.

Hide Company Tags Amazon LinkedIn Snapchat Facebook Yelp

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
    if (beginWord === endWord) {
        return 1;
    }
    
    if (wordList === null) {
        return 0;
    }
    
    let hash = {},
        queue = [];
        
    queue.push(beginWord);
    hash[beginWord] = true;
    
    // 3 loops! level traversal, try to find the shortest path!
    let step = 1;
    while(queue.length > 0) {
        step++;
        let size = queue.length;
        for (let j = 0; j < size; j++) {
            let head = queue.shift();
            let nextWords = getNextWords(head, wordList);
            for (let i = 0; i < nextWords.length; i++) {
                if (hash[nextWords[i]]) {
                    continue;
                }
                // got answer exit
                if (nextWords[i] === endWord) {
                    return step;
                }
                queue.push(nextWords[i]);
                hash[nextWords[i]] = true;
            }
        }
        
    }
    return 0;
};

// having functions to replace letter
function replaceAt(word, i, c) {
    return word.slice(0, i) + c + word.slice(i + 1, word.length);
}

// find next level words, loop the word, try to replace each letter with a - z
// and check if the new word is in the word list or not
function getNextWords(word, wordList) {
    let results = [];
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    for (let k = 0; k < word.length; k++) {
        for (let m = 0; m < letters.length; m++) {
            // if letter[m] === word[k] continue
            if (letters[m] === word[k]) {
                continue;
            }
            let newWord = replaceAt(word, k, letters[m]);
            if (wordList.indexOf(newWord) !== -1) {
                results.push(newWord);
            }
        }
    }
    return results;
}
