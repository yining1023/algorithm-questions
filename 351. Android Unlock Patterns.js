351. Android Unlock Patterns

Given an Android 3x3 key lock screen and two integers m and n, where 1 ≤ m ≤ n ≤ 9, count the total number of unlock patterns of the Android lock screen, which consist of minimum of m keys and maximum n keys.

Rules for a valid pattern:
Each pattern must connect at least m keys and at most n keys.
All the keys must be distinct.
If the line connecting two consecutive keys in the pattern passes through any other keys, the other keys must have previously selected in the pattern. No jumps through non selected key is allowed.
The order of keys used matters.

Explanation:
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 | 8 | 9 |
Invalid move: 4 - 1 - 3 - 6
Line 1 - 3 passes through key 2 which had not been selected in the pattern.

Invalid move: 4 - 1 - 9 - 2
Line 1 - 9 passes through key 5 which had not been selected in the pattern.

Valid move: 2 - 4 - 1 - 3 - 6
Line 1 - 3 is valid because it passes through key 2, which had been selected in the pattern

Valid move: 6 - 5 - 4 - 1 - 9 - 2
Line 1 - 9 is valid because it passes through key 5, which had been selected in the pattern.

Example:
Given m = 1, n = 1, return 9.

Credits:
Special thanks to @elmirap for adding this problem and creating all test cases.

Hide Company Tags Google
Hide Tags Dynamic Programming Backtracking

// O()? depends on the answer? 3* 81 * (m-n)?
// DFS
// start from each cell, go up/down/left/right, when there is >m cells, push it to result until has n cells
// new way to create array: let visted = new Array(10).fill(false);
// Array.from

function dfs(visited, skipList, cur, remain) {
    if (remain < 0) { return 0; }
    if (remain === 0) { return 1; }// === 0, return 1, not === 1, if === 1, go deeper
    visited[cur] = true;
    let times = 0;
    for (let k = 1; k <= 9; k++) {
        if (!visited[k] && (skipList[cur][k] === 0 || visited[skipList[cur][k]])) {
            // next point is not visited, and doesn't skip, or if skip, the skip number is visited
            times += dfs(visited, skipList, k, remain - 1);// pass in k, not cur, cur is already visited and everything
        }
    }
    visited[cur] = false;//remember to pop the number
    return times;
}

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

var numberOfPatterns = function(m, n) {
    let skipList = Array.from(new Array(10), x => new Array(10).fill(0));//Array.from!
    // leave [0][0], index starts from 1 according to the numbers 1 - 9

    skipList[1][3] = skipList[3][1] = 2;
    skipList[1][7] = skipList[7][1] = 4;
    skipList[3][9] = skipList[9][3] = 6;
    skipList[7][9] = skipList[9][7] = 8;

    skipList[1][9] = skipList[9][1] = skipList[3][7] = skipList[7][3] = skipList[4][6] = skipList[6][4] = skipList[2][8] = skipList[8][2] = 5;

    let visited = new Array(10).fill(false);// new Array(10).fill(..)!!
    let res = 0;
    for (let i = m; i <= n; i++) {
        res += dfs(visited, skipList, 1, i - 1) * 4;// i - 1, state becomes smaller and smaller so it can end
        res += dfs(visited, skipList, 2, i - 1) * 4;
        res += dfs(visited, skipList, 5, i - 1);
    }
    return res;
};
