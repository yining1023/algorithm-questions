408. Valid Word Abbreviation

Given a non-empty string s and an abbreviation abbr, return whether the string matches with the given abbreviation.

A string such as "word" contains only the following valid abbreviations:

["word", "1ord", "w1rd", "wo1d", "wor1", "2rd", "w2d", "wo2", "1o1d", "1or1", "w1r1", "1o2", "2r1", "3d", "w3", "4"]
Notice that only the above abbreviations are valid abbreviations of the string "word". Any other string is not a valid abbreviation of "word".

Note:
Assume s contains only lowercase letters and abbr contains only lowercase letters and digits.

Example 1:
Given s = "internationalization", abbr = "i12iz4n":

Return true.
Example 2:
Given s = "apple", abbr = "a2e":

Return false.
Hide Company Tags Google
Hide Tags String
Hide Similar Problems (H) Minimum Unique Word Abbreviation

/**
 * @param {string} word
 * @param {string} abbr
 * @return {boolean}
 */
// loop through the abbr, and word, if letter, compare letter, if number, find until not number, skip the total number
// O(m) m = abbr.length
var validWordAbbreviation = function(word, abbr) {
    if (word === null || abbr === null) {
        return false;
    }
    let count = 0, i = 0, j = 0;
    while (i < word.length && j < abbr.length) {
        if (abbr.charAt(j) === word.charAt(i)) {
            i++;
            j++;
            continue;
        }

        if (Number.isInteger(parseInt(abbr.charAt(j))) && abbr.charAt(j) !== '0') { // "a" "01"
            count = 0;
            while (j < abbr.length && Number.isInteger(parseInt(abbr.charAt(j)))) { // string -> parseInt -> isInteger
                count = count * 10 + parseInt(abbr.charAt(j));
                j++;
            }
            i += count;
        } else { // if !== word, and it's not a number
            return false;
        }
    }
    return i === word.length && j === abbr.length;// "a" "2"
};

// Simple Regex One-liner
// just turn an abbreviation like "i12iz4n" into a regular expression like "i.{12}iz.{4}n". Duh.
// O(1)
var validWordAbbreviation = function(word, abbr) {
    let reg = abbr.replace(/([1-9]\d*)/g, '.{$1}');
    if (word.match(reg) !== null && word.match(reg)[0] === word) {
        return true;
    }
    return false;
};

