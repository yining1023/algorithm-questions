305. Number of Islands II
A 2d grid map of m rows and n columns is initially filled with water. We may perform an addLand operation which turns the water at position (row, col) into a land. Given a list of positions to operate, count the number of islands after each addLand operation. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example:

Given m = 3, n = 3, positions = [[0,0], [0,1], [1,2], [2,1]].
Initially, the 2d grid grid is filled with water. (Assume 0 represents water and 1 represents land).

0 0 0
0 0 0
0 0 0
Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land.

1 0 0
0 0 0   Number of islands = 1
0 0 0
Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land.

1 1 0
0 0 0   Number of islands = 1
0 0 0
Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land.

1 1 0
0 0 1   Number of islands = 2
0 0 0
Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land.

1 1 0
0 0 1   Number of islands = 3
0 1 0
We return the result as an array: [1, 1, 2, 3]

Challenge:

Can you do it in time complexity O(k log mn), where k is the length of the positions?

Hide Company Tags Google
Hide Tags Union Find
Hide Similar Problems (M) Number of Islands

/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} positions
 * @return {number[]}
 */
// O(k log mn)!
// brute force, build one grid, add 1 to it, if it's neighbor are all not 1, answer++
// but in this way, if there is 1 to connect two islands, answer should --; this is one corner case
// track each island's edges? => having a 1D array father = [0, 1, 2, 3]
// loop through every position, answer++ no mater what, then check 4 directions
// if they are not out of boundry, if they are 1, if their father !== f
// then answer--, father[getFather(father, newX * n + newY)] = f;!!!
// getFather!!!
// 1. Know how to write up simple union find class
// 2. Convert 2D array into 1D, f = x * N + y, not M!

// O(nm)?
var numIslands2 = function(m, n, positions) {
    let grid = [];
    let directionX = [0, 0, -1, 1];
    let directionY = [-1, 1, 0, 0];
    let answers = [];
    let answer = 0;
    let father = [];
    
    // 1D array father = [0, 1, 2, 3]
    for (let i = 0; i < m * n; i++) {
        father.push(i);
    }
    
    for (let i = 0; i < m; i++) {
        grid.push([0]);
        for (let j = 1; j < n; j++) {
            grid[i].push(0);
        }
    }
    
    for (let i = 0; i < positions.length; i++) {
        answer++;
        let x = positions[i][0], y = positions[i][1];
        grid[x][y] = 1;
        let f = x * n + y;

        for (let k = 0; k < 4; k++) {
            let newX = x + directionX[k];
            let newY = y + directionY[k];
            if (newX >= 0 && newX < m && newY >= 0 && newY < n 
                && grid[newX][newY] === 1 && getFather(father, newX * n + newY) !== f) {// if they have same father!
                answer--;
                // update father array to indicate they have a same father now
                father[getFather(father, newX * n + newY)] = f;
            }
        }
        answers.push(answer);
    }
    return answers;
};

function getFather(father, i) {
    // it is its own father
    if (father[i] === i) {
        return i;
    }
    // someone else it's it's father
    father[i] = getFather(father, father[i]); // path compression here
    return father[i];
}

// var numIslands2 = function(m, n, positions) {
//     let answers = [];
//     let answer = 0;
//     // initialize the grid
//     let grid = [];
    // for (let i = 0; i < m; i++) {
    //     grid.push([0]);
    //     for (let j = 1; j < n; j++) {
    //         grid[i].push(0);
    //     }
    // }

//     for (let i = 0; i < positions.length; i++) {
        // let newX = positions[i][0];
        // let newY = positions[i][1];
        // if (newX >= 0 && newX < m && newY >= 0 && newY < n) {
//             // not grid[i][j], it's grid[newX][newY]
//             grid[newX][newY] = 1;
//             // pass m, n in
//             answer++;
//             if (checkNeighbors(grid, newX, newY, m, n)) {
//                 answer++;
//             }
//             answers.push(answer);
//         }
//     }
//     return answers;
// };

// function checkNeighbors(grid, i, j, m, n) {
//     directionX = [0, 0, -1, 1];
//     directionY = [-1, 1, 0, 0];
//     let x = i, y = j;
//     for (let k = 0; k < 4; k++) {
//         x = i + directionX[k];
//         y = j + directionY[k];
//         if (x < 0 || x >= m || y < 0 || y >= n) {
//             continue;
//         }
//         if (grid[x][y] === 1) {
//             return false;
//         }
//     }
//     return true;
// }
