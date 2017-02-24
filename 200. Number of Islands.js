// Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

// Example 1:

// 11110
// 11010
// 11000
// 00000
// Answer: 1

// Example 2:

// 11000
// 11000
// 00100
// 00011
// Answer: 3


/**
 * @param {character[][]} grid
 * @return {number}
 */ 
// dfs: O(T) = O(mn), 答案个数 乘以 构造每个答案的时间，答案个数最多为mn／2，时间为4
// dfs could be stack overflow so, bfs is better
// bfs
// bfs is not recursion!!
// bfs: O(T) = O(mn), every node has been passed twice at most.
var numIslands = function(grid) {
    if (grid === null || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    let m = grid.length, n = grid[0].length;
    // use directionX and directionY
    let answer = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                // got 1, answer++, then clean all the 1s that are stick to it!!
                answer++;
                // every time go into the bfs, have a new empty queue, a new bfs
                bfsHelper(grid, i, j, m, n);
            }
        }
    }
    return answer;
};

function bfsHelper(grid, i, j, m, n) {
    let queue = [];
    let directionX = [0, 0, -1, 1];
    let directionY = [-1, 1, 0, 0];
    queue.push({x: i, y: j});
    // change it to 0 immdiately, otherwise TLE
    grid[i][j] = '0';

    while(queue.length > 0) {
        let node = queue.shift();
            for (let k = 0; k < 4; k++) {
                let nei = {x: node.x + directionX[k], y: node.y + directionY[k]};
                // check if out of the boundry!!!
                if (nei.x < 0 || nei.x >= m || nei.y < 0 || nei.y > n) {
                    continue;
                }
                if (grid[nei.x][nei.y] === '1') {
                    queue.push({
                        x: nei.x,
                        y: nei.y
                    });
                    // change it to 0 immdiately
                    grid[nei.x][nei.y] = '0';
                }
            }
        }
    }
 
// dfs
var numIslands = function(grid) {
    if (grid === null || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfsHelper(grid, i, j);
            }
        }
    }
    return count;
};

dfsHelper = function(grid, i, j) {
    let m = grid.length, n = grid[0].length;
    if (i < 0 || i >= m || j < 0 || j >= n) {
        return;
    }
    if (grid[i][j] === '1') {
        grid[i][j] = '0';
        dfsHelper(grid, i + 1, j);
        dfsHelper(grid, i - 1, j);
        dfsHelper(grid, i, j + 1);
        dfsHelper(grid, i, j - 1);
    }
}

// BFS
// var numIslands = function(grid) {
//     if (grid === null || grid.length === 0 || grid[0].length === 0) {
//         return 0;
//     }
    
//     const m = grid.length,
//           n = grid[0].length;
    
//     let islands = 0;

//     for (let i = 0; i < m; i++) {
//         for (let j = 0; j < n; j++) {
//             if (grid[i][j] === '1') {
//                 bfs(grid, i, j, m, n);
//                 islands++;
//             }
//         }
//     }
    
//     return islands;
// };

// function bfs(grid, x, y, m, n) {
//     let queue = [];
//     const directionX = [0, 1, -1, 0];
//     const directionY = [1, 0, 0, -1];
    
//     // 放进去的不是grid[x][y]本身！是x, y坐标
//     queue.push({x: x, y: y});
//     grid[x][y] = '0';
    
//     while (queue.length > 0) {
//         let head = queue.shift();

//         for (let s = 0; s < 4; s++) {
//             // shift出来的head的x, y！！！不是直接的x，y
//             let nei = {x: head.x + directionX[s],
//                         y: head.y + directionY[s]
//             };

//             if (nei.x < 0 || nei.y < 0 || nei.x >= m || nei.y >= n) {
//                 continue;
//             }

//             if (grid[nei.x][nei.y] === '1') {
//                 // 不是push grid。 push nei！
//                 queue.push(nei);
//                 // weird typo... 变量名不要太长 不然【】会看错
//                 grid[nei.x][nei.y] = '0';
//             }
//         }
//     }
//     return;
// }


// // dfs first time 
// var numIslands = function(grid) {
//     if (grid === null || grid.length === 0 || grid[0].length === 0) {
//         return 0;
//     }
    
//     var m = grid.length,
//         n = grid[0].length,
//         answer = 0;
        
//     // two for loop every one in the grid
//     for (var i = 0; i < m; i++) {
//         for (var j = 0; j < n; j++) {
//             // they are string '0' or '1'
//             if (grid[i][j] === '0') {
//                 continue;
//             } else if (grid[i][j] === '1') {
//                 answer++;
//                 dfs(grid, i, j, m, n);
//             }
//         }
//     }
    
//     return answer;
// };

// function dfs(grid, i, j, m, n) {
//     // if going up down, left, right is out of the matrix edge, just return
//     if (i < 0 || i >= m || j < 0 || j >= n) {
//         return;
//     }
    
//     // if === '1', change it to '0'
//     // when for loop passes through it, it will be 0, so the answer won't + 1
//     if (grid[i][j] === '1') {
//         grid[i][j] = '0';
//         // check its up, down, left, right
//         dfs(grid, i - 1, j, m, n);
//         dfs(grid, i + 1, j, m, n);
//         dfs(grid, i, j - 1, m, n);
//         dfs(grid, i, j + 1, m, n);
//     }
//     return;
// }

// dfs twice
// var numIslands = function(grid) {
//     if (grid === null || grid.length === 0 || grid[0].length === 0) {
//         return 0;
//     }
    
//     var m = grid.length,
//         n = grid[0].length;
    
//     var answer = 0;
//     for (var i = 0; i < m; i++) {
//         for (var j = 0; j < n; j++) {
//             if (grid[i][j] === '0') {
//                 continue;
//             } else if (grid[i][j] === '1') {
//                 answer++;
//                 dfs(grid, i, j, m, n);
//             }
//         }
//     }
//     return answer;
// }

// function dfs(grid, i, j, m, n) {
//     if (i >= m || j >= n || i < 0 || j < 0) {
//         return;
//     }

//     if (grid[i][j] === '1') {
//         grid[i][j] = '0';
//         dfs(grid, i - 1, j, m, n);
//         dfs(grid, i + 1, j, m, n);
//         dfs(grid, i, j - 1, m, n);
//         dfs(grid, i, j + 1, m, n);
//     }
    
//     return;
// }
