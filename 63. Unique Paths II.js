// 63. Unique Paths II

// Follow up for "Unique Paths":

// Now consider if some obstacles are added to the grids. How many unique paths would there be?

// An obstacle and empty space is marked as 1 and 0 respectively in the grid.

// For example,
// There is one obstacle in the middle of a 3x3 grid as illustrated below.

// [
//   [0,0,0],
//   [0,1,0],
//   [0,0,0]
// ]
// The total number of unique paths is 2.

// Note: m and n will be at most 100.

// Hide Company Tags Bloomberg
// Hide Tags Array Dynamic Programming
// Hide Similar Problems (M) Unique Paths

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    if (obstacleGrid === null) {
        return 0;
    }
    
    var m = obstacleGrid.length,
        n = obstacleGrid[0].length,
        matrix;
    
    // [if the first one is 1, it should be [0]]
    if (obstacleGrid[0][0] === 1) {
        matrix = [[0]];
    } else if (obstacleGrid[0][0] === 0) {
        matrix = [[1]];
    }
    
    for (var i = 1; i < m; i++) {
        if (obstacleGrid[i][0] === 1) {
            matrix.push([0]);
        } else if (obstacleGrid[i][0] === 0) {
            matrix.push(matrix[i - 1]);
        }
    }
    
    for (var j = 1; j < n; j++) {
        if (obstacleGrid[0][j] === 1) {
            matrix[0].push(0);
        } else if (obstacleGrid[0][j] === 0) {
            // [1, 0] => [0, 0] follow the one before it
            matrix[0].push(matrix[0][j - 1]);
        }
    }

    for (var p = 1; p < m; p++) {
        for (var q = 1; q < n; q++) {
            if (obstacleGrid[p][q] === 1) {
                matrix[p][q] = 0;
            } else if (obstacleGrid[p][q] === 0) {
                matrix[p][q] = matrix[p][q - 1] + matrix[p - 1][q];
            }
        } 
    }
    return matrix[m - 1][n - 1];
};
