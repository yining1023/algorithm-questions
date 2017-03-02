422. Valid Word Square

Given a sequence of words, check whether it forms a valid word square.

A sequence of words forms a valid word square if the kth row and column read the exact same string, where 0 ≤ k < max(numRows, numColumns).

Note:
The number of words given is at least 1 and does not exceed 500.
Word length will be at least 1 and does not exceed 500.
Each word contains only lowercase English alphabet a-z.
Example 1:

Input:
[
  "abcd",
  "bnrt",
  "crmy",
  "dtye"
]

Output:
true

Explanation:
The first row and first column both read "abcd".
The second row and second column both read "bnrt".
The third row and third column both read "crmy".
The fourth row and fourth column both read "dtye".

Therefore, it is a valid word square.
Example 2:

Input:
[
  "abcd",
  "bnrt",
  "crm",
  "dt"
]

Output:
true

Explanation:
The first row and first column both read "abcd".
The second row and second column both read "bnrt".
The third row and third column both read "crm".
The fourth row and fourth column both read "dt".

Therefore, it is a valid word square.
Example 3:

Input:
[
  "ball",
  "area",
  "read",
  "lady"
]

Output:
false

Explanation:
The third row reads "read" while the third column reads "lead".

Therefore, it is NOT a valid word square.
Hide Company Tags Google
Hide Similar Problems (H) Word Squares

/**
 * @param {string[]} words
 * @return {boolean}
 */
// O(mn)
// Simply check for each row and columns, return false if not match.
var validWordSquare = function(words) {
    if (words === null || words.length === 0) {
        return false;
    }
    
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < words[i].length; j++) {
            if (j >= words.length || i >= words[j].length || words[i][j] !== words[j][i]) { 
                // make sure j < words.length, make sure we have words[j]
                // make sure i < words[j].length, because we are checking words[j][i]
                // no need to check j 0 ~ words[i].length because j is in this range anyway
                return false;
            }
        }
    }
    return true;
};

