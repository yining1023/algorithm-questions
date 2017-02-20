// 62. Unique Paths

// A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

// The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

// How many possible unique paths are there?


// Above is a 3 x 7 grid. How many possible unique paths are there?

// Note: m and n will be at most 100.

// Hide Company Tags Bloomberg
// Hide Tags Array Dynamic Programming
// Hide Similar Problems (M) Unique Paths II (M) Minimum Path Sum (H) Dungeon Game

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
 
// 小学奥数题吗？DP
// the trick is that puttig numbers in each square to represent if the end is in that square, how many paths are there
// having a 2d matrix, row[0] and col[0], there will only be 1 path to the end
// for the rest of squares, the number of path is the sum of top and left
// start 1, 1, 1, 1,
//       1, 2, 3, 4,
//       1, 3, 6, 10
var uniquePaths = function(m, n) {
    if (m <= 0 || n <= 0) {
        return 0;
    }
    
    let matrix = [];
    for (let i = 0; i < m; i++) {
        matrix.push([1]);
    }
    for (let j = 1; j < n; j++) {
        matrix[0].push(1);
    }
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            matrix[i][j] = matrix[i][j - 1] + matrix[i - 1][j];
        }
    }
    return matrix[m - 1][n - 1];
};

// var uniquePaths = function(m, n) {
//     if (m === null || n === null || m === 0 || n === 0) {
//         return 0;
//     }
//     var matrix = [[1]];
    
//     for (var i = 1; i < m; i++) {
//         matrix.push([1]);
//     }
    
//     for (var j = 1; j < n; j++) {
//         matrix[0].push(1);
//     }
    
//     for (var p = 1; p < m; p++) {
//         for (var q = 1; q < n; q++) {
//             matrix[p][q] = matrix[p][q - 1] + matrix[p - 1][q];
//         } 
//     }
    
//     return matrix[m - 1][n - 1];
// };
