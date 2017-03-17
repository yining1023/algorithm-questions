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
// O(n) time ValidWordAbbr, O(1) time for isUnique
// map key: "c2k" => value: "cake"
var ValidWordAbbr = function(dictionary) {
    this.map = new Map();
    dictionary.forEach((dic) => {
        let key = this.getKey(dic);
        if (this.map.has(key)) {
            // already has it, and its !== the word, then it's not unique, then put it as "", cannot delete it.
            // if delete it, no keys, will think it's new abbr, unique. ["dear", "deer"] isUnique("door") => true
            if (this.map.get(key) !== dic) {// if dic = ["a", "a"], "a".isUnique() => TRUE! so check if === first,
                this.map.set(key, "");
            }
        } else {
            this.map.set(key, dic);// ["dear"] isUnique("door") => false. save the word
        }
    });
};

/**
 * @param {string} word
 * @return {boolean}
 */
ValidWordAbbr.prototype.getKey = function(word) {
    // corner case "a" => "a", "ab" => "ab"
    let n = word.length;
    if (n <= 2) return word;
    let key = word[0] + JSON.stringify(n - 2) + word[n - 1]; // n - 1 is the last char
    return key;
};


ValidWordAbbr.prototype.isUnique = function(word) {
    // generate the key first!
    let wordKey = this.getKey(word);
    // no need to use map.forEach here, just check if it has this key or not
    if (this.map.has(wordKey)) {// ["dear"] isUnique("dear") => true.也有可能这个数自己在dict里面，这时候也是unique的
        if (word === this.map.get(wordKey))
            return true;
        else
            return false;
    }
    return true;// if after looping through all keys in the map, there is no key matches, means it's a new abbr!
}

/**
 * Your ValidWordAbbr object will be instantiated and called as such:
 * var obj = Object.create(ValidWordAbbr).createNew(dictionary)
 * var param_1 = obj.isUnique(word)
 */
