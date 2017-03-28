542. 01 Matrix

Given a matrix consists of 0 and 1, find the distance of the nearest 0 for each cell.

The distance between two adjacent cells is 1.
Example 1:
Input:

0 0 0
0 1 0
0 0 0
Output:
0 0 0
0 1 0
0 0 0
Example 2:
Input:

0 0 0
0 1 0
1 1 1
Output:
0 0 0
0 1 0
1 2 1
Note:
The number of elements of the given matrix will not exceed 10,000.
There are at least one 0 in the given matrix.
The cells are adjacent in only four directions: up, down, left and right.
Hide Company Tags Google
Hide Tags Depth-first Search Breadth-first Search

/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
// bfs, no need for level, the current node has the distance info
// In worst case, one cell will at max be added to queue once. Thus run time complexity is O(n), n is number of cells.
var updateMatrix = function(matrix) {
    let m = matrix.length,
        n = matrix[0].length;

    let queue = [];
    // no need for map, use the matrix itself to store the distance data

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 0)
                queue.push([i, j]);
            else
                matrix[i][j] = Infinity;
        }
    }

    let dirX = [1, -1, 0, 0],
        dirY = [0, 0, 1, -1];

    while (queue.length > 0) {
        let cur = queue.shift();
        for (let k = 0; k < 4; k++) {
            newNode = [cur[0]+dirX[k], cur[1]+dirY[k]];
            if (newNode[0] < 0 || newNode[1] < 0 || newNode[0] >= m || newNode[1] >= n) continue;
            if (matrix[newNode[0]][newNode[1]] <= matrix[cur[0]][cur[1]] + 1) continue;
            matrix[newNode[0]][newNode[1]] = matrix[cur[0]][cur[1]] + 1;//update the distance
            queue.push(newNode); // push the neighbor into the queue
        }
    }

    return matrix;
};

