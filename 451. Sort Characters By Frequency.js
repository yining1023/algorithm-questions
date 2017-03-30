451. Sort Characters By Frequency

Given a string, sort it in decreasing order based on the frequency of characters.

Example 1:

Input:
"tree"

Output:
"eert"

Explanation:
'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
Example 2:

Input:
"cccaaa"

Output:
"cccaaa"

Explanation:
Both 'c' and 'a' appear three times, so "aaaccc" is also a valid answer.
Note that "cacaca" is incorrect, as the same characters must be together.
Example 3:

Input:
"Aabb"

Output:
"bbAa"

Explanation:
"bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.
Hide Company Tags Amazon Google
Hide Tags Hash Table Heap
Hide Similar Problems (M) Top K Frequent Elements

/**
 * @param {string} s
 * @return {string}
 */
// hashmap

// 1. with sorting O(nlogn) time
var frequencySort = function(s) {
    if (s === null || s.length === 0) return s;

    let results = '';
    let map = new Map();
    // 1. get map
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) { map.set(s[i], map.get(s[i]) + 1); }
        else { map.set(s[i], 1); }
    }

    // 2. sort map, nlogn
    let frequency = [...map].sort( (a, b) => {return b[1] - a[1]});//decreasing order b - a

    // 3. form results
    for (let j = 0; j < frequency.length; j++) {
        let result = '';
        for (let k = 0; k < frequency[j][1]; k++) {
            result += frequency[j][0];
        }
        results += result;
    }

    return results;
};

// 2. without sort, O(n) time, but with extra space
var frequencySort = function(s) {
    if (s === null || s.length === 0) return s;

    let results = '';
    let map = new Map();
    let frequency = new Array(s.length + 1).fill("");

    // 1. get map
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i])) { map.set(s[i], map.get(s[i]) + 1); }
        else { map.set(s[i], 1); }
    }

    // 2. use an array to save the order of the map, index === frequecy
    map.forEach((value, key) => {
        for (let m = 0; m < value; m++) {
            frequency[value] += key;
        }
    });

    // 3. form results
    for (let j = s.length; j > 0; j--) {
        if (frequency[j] !== '') results += frequency[j];
    }

    return results;
};

