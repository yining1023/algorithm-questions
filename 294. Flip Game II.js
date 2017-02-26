294. Flip Game II

You are playing the following Flip Game with your friend: Given a string that contains only these two characters: + and -, you and your friend take turns to flip two consecutive "++" into "--". The game ends when a person can no longer make a move and therefore the other person will be the winner.

Write a function to determine if the starting player can guarantee a win.

For example, given s = "++++", return true. The starting player can guarantee a win by flipping the middle "++" to become "+--+".

Follow up:
Derive your algorithm's runtime complexity.

Hide Company Tags Google
Hide Tags Backtracking
Hide Similar Problems (E) Nim Game (E) Flip Game (M) Guess Number Higher or Lower II (M) Can I Win

/**
 * @param {string} s
 * @return {boolean}
 */
// NOT!!!! find out if the number of solutions is an odd number
// everytime the s changes!
// dfs? recursion
// The idea is try to replace every "++" in the current string s to "--" and see if the opponent can win or not, if the opponent cannot win, great, we win!
// For the time complexity, here is what I thought, let's say the length of the input string s is n, there are at most n - 1 ways to replace "++" to "--" (imagine s is all "+++..."), once we replace one "++", there are at most (n - 2) - 1 ways to do the replacement, it's a little bit like solving the N-Queens problem, the time complexity is (n - 1) x (n - 3) x (n - 5) x ..., so it's O(n!!), double factorial.
// O(n!!)
// every time, change one pair ++ to --, get new string, then call canWin again for your friend, if it's false, means you win.
var canWin = function(s) {
    if (s === null || s.length < 2) {
        return false;
    }
    for (let i = 0; i < s.length - 1; i++) {
        if (s.startsWith('++', i)) {
            let newS = s.substring(0, i) + '--' + s.substring(i + 2);
            if (!canWin(newS)) {
                return true;
            }
        }
    }
    return false;
};

// If we use HashMap to memorize both win string & lose string, we can further reduce time
var canWin = function(s) {
    if (s === null || s.length < 2) {
        return false;
    }
    let map = new Map();
    return canWinHelper(s, map);
};

function canWinHelper(s, map) {
    if (map.has(s)) {
        return map.get(s);
    }
    for (let i = 0; i < s.length - 1; i++) {
        if (s.startsWith('++', i)) {
            let newS = s.substring(0, i) + '--' + s.substring(i + 2);
            if (!canWin(newS)) {
                map.set(newS, true);
                return true;
            }
        }
    }
    map.set(s, false);
    return false;
}


// the following answer is not right!
// var canWin = function(s) {
//     let numOfSteps = 0;
//     if (s === null || s.length < 2) {
//         return false;
//     }
//     for (let i = 0; i < s.length - 1; i++) {
//         if (s.charAt(i) === '+' && s.charAt(i + 1) === '+') {
//             let temp = s.substring(0, i) + '--' + s.substring(i + 2, s.length);
//             numOfSteps++; // no need for deep copy
//         }
//     }
//     return numOfSteps % 2 !== 0;
// };

// function findSolutions(s) {
//     let results = [];
//     if (s === null || s.length < 2) {
//         return results;
//     }
//     for (let i = 0; i < s.length - 1; i++) {
//         if (s.charAt(i) === '+' && s.charAt(i + 1) === '+') {
//             let temp = s.substring(0, i) + '--' + s.substring(i + 2, s.length);
//             results.push(temp); // no need for deep copy
//         }
//     }
//     return results;
// }
