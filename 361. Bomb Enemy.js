361. Bomb Enemy

Given a 2D grid, each cell is either a wall 'W', an enemy 'E' or empty '0' (the number zero), return the maximum enemies you can kill using one bomb.
The bomb kills all the enemies in the same row and column from the planted point until it hits the wall since the wall is too strong to be destroyed.
Note that you can only put the bomb at an empty cell.

Example:
For the given grid

0 E 0 0
E 0 W E
0 E 0 0

return 3. (Placing a bomb at (1,1) kills 3 enemies)
Credits:
Special thanks to @memoryless for adding this problem and creating all test cases.

Hide Company Tags Google
Hide Tags Dynamic Programming

/**
 * @param {character[][]} grid
 * @return {number}
 */
// 需要一个rowCnt变量，用来记录到下一个墙之前的敌人个数。还需要一个数组colCnt，其中colCnt[j]表示第j列到下一个墙之前的敌人个数。
// 算法思路是遍历整个数组grid，对于一个位置grid[i][j]，
// 对于水平方向，如果当前位置是开头一个或者前面一个是墙壁，我们开始从当前位置往后遍历，遍历到末尾或者墙的位置停止，计算敌人个数。
// 对于竖直方向也是同样，如果当前位置是开头一个或者上面一个是墙壁，我们开始从当前位置向下遍历，遍历到末尾或者墙的位置停止，计算敌人个数。
// 有了水平方向和竖直方向敌人的个数，那么如果当前位置是0，表示可以放炸弹，我们更新结果res即可

var maxKilledEnemies = function(grid) {
    if (grid === null || grid.length === 0) {
        return 0;
    }
    
    const m = grid.length, n = grid[0].length;
    // 每一列的count要重新计算 不同，用colCount[j]
    let rowCount = 0, colCount = [];
    let MaxEnemy = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // new row || before it's a W, needs to calculate the rwoCount again
            if (j === 0 || grid[i][j - 1] === 'W') {
                rowCount = 0;
                // check if it's 'W'
                for (let k = j; k < n && grid[i][k] !== 'W'; k++) {
                    rowCount += grid[i][k] === 'E' ? 1 : 0;
                }
            }
            
            // new col || before there is a W, needs to calculate the colCount again
            if (i === 0 || grid[i - 1][j] === 'W') {
                colCount[j] = 0;
                // check if it's 'W'
                for (let k = i; k < m && grid[k][j] !== 'W'; k++) {
                    colCount[j] += grid[k][j] === 'E' ? 1 : 0;
                }
            }

            if (grid[i][j] === '0') {
                MaxEnemy = Math.max(MaxEnemy, rowCount + colCount[j]);
            }
        }
    }
    
    return MaxEnemy;
};
