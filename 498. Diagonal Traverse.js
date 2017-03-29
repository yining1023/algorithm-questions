498. Diagonal Traverse

Given a matrix of M x N elements (M rows, N columns), return all elements of the matrix in diagonal order as shown in the below image.

Example:
Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
Output:  [1,2,4,7,5,3,6,8,9]
Explanation:

Note:
The total number of elements of the given matrix will not exceed 10,000.
Hide Company Tags Google

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
// 画对角线很容易，实现的时候可以想成在matrix里面上下左右这么走，跟一般一行一行走不同，只要规定好他的走法就可以！
// I don't think this is a hard problem. It is easy to figure out the walk pattern. Anyway...
// Walk patterns:

// If out of bottom border (row >= m) then row = m - 1; col += 2; change walk direction.
// if out of right border (col >= n) then col = n - 1; row += 2; change walk direction.
// if out of top border (row < 0) then row = 0; change walk direction.
// if out of left border (col < 0) then col = 0; change walk direction.
// Otherwise, just go along with the current direction.

// Time complexity: O(m * n), m = number of rows, n = number of columns.
// Space complexity: O(1).
var findDiagonalOrder = function(matrix) {
    if (matrix === null || matrix.length === 0) return [];

    let m = matrix.length,
        n = matrix[0].length;

    let results = new Array(n * m);
    let row = 0, col = 0, d = 0;

    let dir = [[-1, 1], [1, -1]];

    for (let i = 0; i < m * n; i++) {
        results[i] = matrix[row][col];

        row += dir[d][0];
        col += dir[d][1];


        if (row >= m) {row = m - 1; col += 2; d = 1 - d;}// check this first then check if < 0, the order is important
        if (col >= n) {col = n - 1; row += 2; d = 1 - d;}
        if (row < 0) {row = 0; d = 1 - d;} // col stays the same
        if (col < 0) {col = 0; d = 1 - d;} // use 1 - d to change direction

    }

    return results;
};
