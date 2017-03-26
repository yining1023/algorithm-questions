490. The Maze

There is a ball in a maze with empty spaces and walls. The ball can go through empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the ball's start position, the destination and the maze, determine whether the ball could stop at the destination.

The maze is represented by a binary 2D array. 1 means the wall and 0 means the empty space. You may assume that the borders of the maze are all walls. The start and destination coordinates are represented by row and column indexes.

Example 1

Input 1: a maze represented by a 2D array

0 0 1 0 0
0 0 0 0 0
0 0 0 1 0
1 1 0 1 1
0 0 0 0 0

Input 2: start coordinate (rowStart, colStart) = (0, 4)
Input 3: destination coordinate (rowDest, colDest) = (4, 4)

Output: true
Explanation: One possible way is : left -> down -> left -> down -> right -> down -> right.

Example 2

Input 1: a maze represented by a 2D array

0 0 1 0 0
0 0 0 0 0
0 0 0 1 0
1 1 0 1 1
0 0 0 0 0

Input 2: start coordinate (rowStart, colStart) = (0, 4)
Input 3: destination coordinate (rowDest, colDest) = (3, 2)

Output: false
Explanation: There is no way for the ball to stop at the destination.

Note:
There is only one ball and one destination in the maze.
Both the ball and the destination exist on an empty space, and they will not be at the same position initially.
The given maze does not contain border (like the red rectangle in the example pictures), but you could assume the border of the maze are all walls.
The maze contains at least 2 empty spaces, and both the width and height of the maze won't exceed 100.
Hide Company Tags Google
Hide Tags Depth-first Search Breadth-first Search
Hide Similar Problems (H) The Maze III (M) The Maze II

/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {boolean}
 */
// 1. dfs O(V+E), V<=m*n, E<=m*n*4, O(mn)
// Search in the four possible directions when coming to a stopping point (i.e. a new starting point).
// Keep track of places that you already started at in case you roll back to that point.
var hasPath = function(maze, start, destination) {
    var m = maze.length, n = maze[0].length;
    var visited = [];
    for (let i = 0; i < m; i++) {
        visited.push([]);
        for (let j = 0; j < n; j++) {
            visited[i].push(false);
        }
    }

    return dfs(maze, visited, start, destination);
};

var directionX = [1, -1, 0, 0],
    directionY = [0, 0, 1, -1];

function dfs(maze, visited, start, destination) {
    if (start[0] === destination[0] && start[1] === destination[1]) return true;//find it!
    if (visited[start[0]][start[1]]) return false;//already visted, not valid spot,

    visited[start[0]][start[1]] = true;// mark it as visited

    let newStart;
    for (let k = 0; k < 4; k++) {// 4 directions
        newStart = roll(maze, start[0], start[1], directionX[k], directionY[k]);// get one new start
        if (dfs(maze, visited, newStart, destination)) return true;//if its neighbor find it, here true here too!!!
    }

    return false;
}

function roll(maze, startX, startY, directionX, directionY) {
    while (canRoll(maze, startX + directionX, startY + directionY)) {
        startX = startX + directionX;
        startY = startY + directionY;
    }
    return [startX, startY];
}

function canRoll(maze, x, y) {
    if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length) return false;
    return maze[x][y] !== 1;
}

// 2. bfs O(V+E), V<=m*n, E<=m*n*4, O(mn)
var hasPath = function(maze, start, destination) {
    var m = maze.length, n = maze[0].length;
    var visited = [];
    for (let i = 0; i < m; i++) {
        visited.push([]);
        for (let j = 0; j < n; j++) {
            visited[i].push(false);
        }
    }

    var directionX = [1, -1, 0, 0];
    var directionY = [0, 0, 1, -1];

    // bfs
    var queue = [];
    if (start[0] === destination[0] && start[1] === destination[1]) return true;//find it! if not push it into queue
    queue.push(start);
    visited[start[0]][start[1]] = true; // two good friends

    while (queue.length > 0) {
        let current = queue.shift();
        let curX = current[0], curY = current[1];

        for (let k = 0; k < 4; k++) {
            let neighbor = roll(maze, curX, curY, directionX[k], directionY[k]);
            if (visited[neighbor[0]][neighbor[1]]) continue;

            visited[neighbor[0]][neighbor[1]] = true;
            if (neighbor[0] === destination[0] && neighbor[1] === destination[1]) return true;//find it!
            queue.push(neighbor);
        }

    }
    return false;
};

function roll(maze, startX, startY, directionX, directionY) {
    while (canRoll(maze, startX + directionX, startY + directionY)) {
        startX = startX + directionX;
        startY = startY + directionY;
    }
    return [startX, startY];
}

function canRoll(maze, x, y) {
    if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length) return false;
    return maze[x][y] !== 1;
}


