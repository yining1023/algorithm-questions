527. Word Abbreviation

Given an array of n distinct non-empty strings, you need to generate minimal possible abbreviations for every word following rules below.

Begin with the first character and then the number of characters abbreviated, which followed by the last character.
If there are any conflict, that is more than one words share the same abbreviation, a longer prefix is used instead of only the first character until making the map from word to abbreviation become unique. In other words, a final abbreviation cannot map to more than one original words.
If the abbreviation doesn't make the word shorter, then keep it as original.
Example:
Input: ["like", "god", "internal", "me", "internet", "interval", "intension", "face", "intrusion"]
Output: ["l2e","god","internal","me","i6t","interval","inte4n","f2e","intr4n"]
Note:
Both n and the length of each word will not exceed 400.
The length of each word is greater than 1.
The words consist of lowercase English letters only.
The return answers should be in the same order as the original array.
Hide Company Tags Google Snapchat
Hide Tags Sort String
Hide Similar Problems (E) Valid Word Abbreviation (H) Minimum Unique Word Abbreviation

/**
 * @param {string[]} dict
 * @return {string[]}
 */
// for loop, map, save, abbr => word, if already has this abbr, compare this two word, get a acceptable abbr for both, use splice

// Make abbreviation for each word.
// Then, check each word, if there are some strings which have same abbreviation with it, increase the prefix.
var wordsAbbreviation = function(dict) {
    let dictLen = dict.length;
    let results = new Array(dictLen);
    let prefix = new Array(dictLen).fill(1);

    for (let p = 0; p < dictLen; p++) {
        results[p] = makeAbbr(dict[p], 1);
    }

    for (let i = 0; i < dictLen; i++) {
        while (true) {// have a while loop, the word will stuck in it until there abbr are not the same
            let set = new Set();// set(index1, index2, index3) all the words that have this same abbr
            for (let j = i + 1; j < dictLen; j++) {// check all the later ones, j starts from i + 1
                if (results[j] === results[i]) set.add(j);
            }
            if (set.size === 0) break;// no duplicates

            set.add(i);// add itself
            set.forEach(index => {
                results[index] = makeAbbr(dict[index], ++prefix[index]);// ++prefix[index]
            });
        }
    }

    return results;
};

function makeAbbr(word, prefixLen) {
    if (word.length - prefixLen <= 2) return word;// like god, 3 - 1 = 2, return god
    let abbr = word.substring(0, prefixLen);
    abbr += JSON.stringify(word.length - 1 - prefixLen);
    abbr += word.charAt(word.length - 1);
    return abbr;
}
