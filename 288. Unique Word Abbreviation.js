288. Unique Word Abbreviation

An abbreviation of a word follows the form <first letter><number><last letter>. Below are some examples of word abbreviations:

a) it                      --> it    (no abbreviation)

     1
b) d|o|g                   --> d1g

              1    1  1
     1---5----0----5--8
c) i|nternationalizatio|n  --> i18n

              1
     1---5----0
d) l|ocalizatio|n          --> l10n
Assume you have a dictionary and given a word, find whether its abbreviation is unique in the dictionary. A word's abbreviation is unique if no other word from the dictionary has the same abbreviation.

Example: 
Given dictionary = [ "deer", "door", "cake", "card" ]

isUnique("dear") -> 
false

isUnique("cart") -> 
true

isUnique("cane") -> 
false

isUnique("make") -> 
true

Hide Company Tags Google
Hide Tags Hash Table Design
Hide Similar Problems (E) Two Sum III - Data structure design (M) Generalized Abbreviation


// hash map!!!!
// To check for unique abbreviation, we maintain a mapping from a specific abbreviation to all words which have the abbreviation
// Then we just need to check no other words have the same abbreviation as the given word.

/**
 * @param {string[]} dictionary
 */
var ValidWordAbbr = function(dictionary) {
    this.map = {};
    for (let i = 0; i < dictionary.length; i++) {
        let d = dictionary[i];
        let n = d.length;
        let abbr = d[0] + JSON.stringify(n - 2) + d[n - 1];
        if (this.map[abbr] === undefined) {
            this.map[abbr] = [];
            this.map[abbr].push(d);
        }
    }
};

/** 
 * @param {string} word
 * @return {boolean}
 */

ValidWordAbbr.prototype.isUnique = function(word) {
    let n = word.length;
    let abbr = word[0] + JSON.stringify(n - 2) + word[n - 1];
    // 也有可能这个数自己在dict里面，这时候也是unique的
    // 那么map里面的【】就必须全是word才行
    if (this.map[abbr] !== undefined) {
        var count = 0;
        for (var i = 0; i < this.map[abbr].length; ++i) {
            if (this.map[abbr][i] == word)
            count++;
        }
    }
    return this.map[abbr] === undefined || count === this.map[abbr].length;
}

/** 
 * Your ValidWordAbbr object will be instantiated and called as such:
 * var obj = Object.create(ValidWordAbbr).createNew(dictionary)
 * var param_1 = obj.isUnique(word)
 */
 