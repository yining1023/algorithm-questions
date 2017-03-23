308. Range Sum Query 2D - Mutable

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
update(3, 2, 2)
sumRegion(2, 1, 4, 3) -> 10
Note:
The matrix is only modifiable by the update function.
You may assume the number of calls to update and sumRegion function is distributed evenly.
You may assume that row1 ≤ row2 and col1 ≤ col2.
Hide Company Tags Google
Hide Tags Binary Indexed Tree Segment Tree
Hide Similar Problems (M) Range Sum Query 2D - Immutable (M) Range Sum Query - Mutable

// rowSum matrix, O(n) for update, O(m) for sum

public class NumMatrix {
    int[][] rowSums;

    public NumMatrix(int[][] matrix) {
        if (matrix.length == 0)
            return;
        rowSums = new int[matrix.length][matrix[0].length];

        // 建rowSums矩阵
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[0].length; j++) {
                rowSums[i][j] = matrix[i][j] + (j == 0 ? 0 : rowSums[i][j - 1]);
            }
        }
    }

    public void update(int row, int col, int val) {
        // 求出新值与旧值的差
        int diff = val - (rowSums[row][col] - (col == 0 ? 0 : rowSums[row][col - 1]));

        // 更新该行受影响的sum
        for (int j = col; j < rowSums[0].length; j++) {
            rowSums[row][j] += diff;
        }
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        int res = 0;

        // 逐行求和，每行的相应和为两sum相减
        for (int i = row1; i <= row2; i++) {
            res += rowSums[i][col2] - (col1 == 0 ? 0 :rowSums[i][col1 - 1]);
        }
        return res;
    }
}


// Your NumMatrix object will be instantiated and called as such:
// NumMatrix numMatrix = new NumMatrix(matrix);
// numMatrix.sumRegion(0, 1, 2, 3);
// numMatrix.update(1, 1, 10);
// numMatrix.sumRegion(1, 2, 3, 4);

/**
 * @param {number[][]} matrix
 */
// 1. brute force, two for loops for sumRegion O(nm), update O(1). O(nm) space

// 2. build prefix sum matrix, sumRegion O(1), update O(mn). O(nm) space

// 3. build prefix row only sum matrix, O(m) sumRegion, O(n) update. O(nm) space
var rowSum = [];
var NumMatrix = function(matrix) {
    let m = matrix.length,
        n = matrix.length > 0 ? matrix[0].length : 0;

    rowSum = [];
    for (let i = 0; i < m; i++) {
        rowSum.push([]);
        for (let j = 0; j < n; j++) {
            rowSum[i].push(matrix[i][j] + ((j > 0) ? rowSum[i][j - 1] : 0));// when use ? :, use () to wrapt them!!
        }
    }
};

/**
 * @param {number} row
 * @param {number} col
 * @param {number} val
 * @return {void}
 */
NumMatrix.prototype.update = function(row, col, val) {
    let diff = val - (rowSum[row][col] - (col > 0 ? rowSum[row][col - 1] : 0));
    for (let i = col; i < rowSum[row].length; i++) {
        rowSum[row][i] += diff;
    }
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    let result = 0;
    for (let j = row1; j <= row2; j++) {
        result += rowSum[j][col2] - (col1 > 0 ? rowSum[j][col1 - 1] : 0);// when use col1 - 1, check col1 > 0 first!
    }
    return result;
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = Object.create(NumMatrix).createNew(matrix)
 * obj.update(row,col,val)
 * var param_2 = obj.sumRegion(row1,col1,row2,col2)
 */
