304. Range Sum Query 2D - Immutable

Given a 2D matrix matrix, find the sum of the elements inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

Range Sum Query 2D
The above rectangle (with the red border) is defined by (row1, col1) = (2, 1) and (row2, col2) = (4, 3), which contains sum = 8.

Example:
Given matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]

sumRegion(2, 1, 4, 3) -> 8
sumRegion(1, 1, 2, 2) -> 11
sumRegion(1, 2, 2, 4) -> 12
Note:
You may assume that the matrix does not change.
There are many calls to sumRegion function.
You may assume that row1 ≤ row2 and col1 ≤ col2.
Hide Tags Dynamic Programming
Hide Similar Problems (E) Range Sum Query - Immutable (H) Range Sum Query 2D - Mutable

// Construct a 2D array sums[row+1][col+1]

// (notice: we add additional blank row sums[0][col+1]={0} and blank column sums[row+1][0]={0} to remove the edge case checking), so, we can have the following definition

// sums[i+1][j+1] represents the sum of area from matrix[0][0] to matrix[i][j]

// To calculate sums, the ideas as below

// +-----+-+-------+     +--------+-----+     +-----+---------+     +-----+--------+
// |     | |       |     |        |     |     |     |         |     |     |        |
// |     | |       |     |        |     |     |     |         |     |     |        |
// +-----+-+       |     +--------+     |     |     |         |     +-----+        |
// |     | |       |  =  |              |  +  |     |         |  -  |              |
// +-----+-+       |     |              |     +-----+         |     |              |
// |               |     |              |     |               |     |              |
// |               |     |              |     |               |     |              |
// +---------------+     +--------------+     +---------------+     +--------------+

//   sums[i][j]      =    sums[i-1][j]    +     sums[i][j-1]    -   sums[i-1][j-1]   +

//                         matrix[i-1][j-1]
// So, we use the same idea to find the specific area's sum.

// +---------------+   +--------------+   +---------------+   +--------------+   +--------------+
// |               |   |         |    |   |   |           |   |         |    |   |   |          |
// |   (r1,c1)     |   |         |    |   |   |           |   |         |    |   |   |          |
// |   +------+    |   |         |    |   |   |           |   +---------+    |   +---+          |
// |   |      |    | = |         |    | - |   |           | - |      (r1,c2) | + |   (r1,c1)    |
// |   |      |    |   |         |    |   |   |           |   |              |   |              |
// |   +------+    |   +---------+    |   +---+           |   |              |   |              |
// |        (r2,c2)|   |       (r2,c2)|   |   (r2,c1)     |   |              |   |              |
// +---------------+   +--------------+   +---------------+   +--------------+   +--------------+
/**
 * @param {number[][]} matrix
 */
// use .fill(0) with caution, fill copy it with reference, so later when only change matrix[i][j] the whole col all would be changed
// O(mn) space with O(1) time
var sumMatrix;
var row, col;
var NumMatrix = function(matrix) {
    // build a sum matrix, size: row + 1 x col + 1
    row = matrix.length,
    col = matrix.length > 0 ? matrix[0].length : 0;

    sumMatrix = [];// use nested for loop to initialize the matrix
    for (let n = 0; n < row + 1; n++) {
        sumMatrix.push([]);
        for (let k = 0; k < col + 1; k++) {
            sumMatrix[n].push(0);
        }
    }

    for (let i = 1; i <= row; i++) {
        for (let j = 1; j <= col; j++) {
            sumMatrix[i][j] = sumMatrix[i-1][j] + sumMatrix[i][j-1] - sumMatrix[i-1][j-1] + matrix[i-1][j-1];
        }
    }
    console.log(sumMatrix);
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    return sumMatrix[row2+1][col2+1] - sumMatrix[row2+1][col1] - sumMatrix[row1][col2+1] + sumMatrix[row1][col1];
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = Object.create(NumMatrix).createNew(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
