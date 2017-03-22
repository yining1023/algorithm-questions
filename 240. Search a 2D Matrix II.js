// 240. Search a 2D Matrix II

// Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

// Integers in each row are sorted in ascending from left to right.
// Integers in each column are sorted in ascending from top to bottom.
// For example,

// Consider the following matrix:

// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// Given target = 5, return true.

// Given target = 20, return false.

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

// cannot use binary search anymore, only O (m + n)
// start from the bottom left corner
// > target, go up;
// < target, go right
var searchMatrix = function(matrix, target) {
    if (target === null || matrix === null || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }

    var row = matrix.length - 1, // last row
        col = 0;

    while(row >= 0 && col < matrix[0].length) {// don't forget the restrction
        var currentNum = matrix[row][col];
        if (currentNum > target) {// go up, the uppper one is defninitely smaller than itself
            row--;
        } else if (currentNum < target) {// go right, the right one is definitely bigger than itself
            col++;
        } else if (currentNum === target) {
            return true;
        }
    }

    return false;
};
