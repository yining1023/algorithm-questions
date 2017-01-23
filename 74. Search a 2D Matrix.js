// 74. Search a 2D Matrix

// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

// Integers in each row are sorted from left to right.
// The first integer of each row is greater than the last integer of the previous row.
// For example,

// Consider the following matrix:

// [
//   [1,   3,  5,  7],
//   [10, 11, 16, 20],
//   [23, 30, 34, 50]
// ]
// Given target = 3, return true.

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    // binary search
    // consider input is [[]], matrix[0].length === 0
    if (matrix.length === 0 || matrix[0].length === 0 || matrix === null || target === null) {
        return false;
    }
    
    var n = matrix.length,
        m = matrix[0].length;

    var start = 0,
        end = m * n - 1,
        mid;
        
    while (start + 1 < end) {
        mid = start + (end - start) / 2;
        // use parseInt!!!!!!
        var row = parseInt(mid / m);
        var col = parseInt(mid % m);
        
        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] < target) {
            start = mid;
        } else if (matrix[row][col] > target) {
            end = mid;
        }
    }
    
    // check start and end should be out of while too!!!!  
    if (matrix[parseInt(start / m)][parseInt(start % m)] === target) {
        return true;
    }
        
    if (matrix[parseInt(end / m)][parseInt(end % m)] === target) {
        return true;
    }
    // return false should be out of the while!!!
    return false;
};
