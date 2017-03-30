505. The Maze II

There is a ball in a maze with empty spaces and walls. The ball can go through empty spaces by rolling up, down, left or right, but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.

Given the ball's start position, the destination and the maze, find the shortest distance for the ball to stop at the destination. The distance is defined by the number of empty spaces traveled by the ball from the start position (excluded) to the destination (included). If the ball cannot stop at the destination, return -1.

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

Output: 12
Explanation: One shortest way is : left -> down -> left -> down -> right -> down -> right.
             The total distance is 1 + 1 + 3 + 1 + 2 + 2 + 2 = 12.

Example 2

Input 1: a maze represented by a 2D array

0 0 1 0 0
0 0 0 0 0
0 0 0 1 0
1 1 0 1 1
0 0 0 0 0

Input 2: start coordinate (rowStart, colStart) = (0, 4)
Input 3: destination coordinate (rowDest, colDest) = (3, 2)

Output: -1
Explanation: There is no way for the ball to stop at the destination.

Note:
There is only one ball and one destination in the maze.
Both the ball and the destination exist on an empty space, and they will not be at the same position initially.
The given maze does not contain border (like the red rectangle in the example pictures), but you could assume the border of the maze are all walls.
The maze contains at least 2 empty spaces, and both the width and height of the maze won't exceed 100.
Hide Company Tags Google
Hide Tags Depth-first Search Breadth-first Search
Hide Similar Problems (M) The Maze (H) The Maze III

/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {number}
 */
// 1. bfs + visited matrix; queue: {start: [x, y], steps: number}
var shortestDistance = function(maze, start, destination) {
    var m = maze.length, n = maze[0].length;
    var visited = [];// use visited matrix to track the length, from start to this point
    for (let i = 0; i < m; i++) {
        visited.push([]);
        for (let j = 0; j < n; j++) {
            visited[i].push(Infinity);
        }
    }

    var directionX = [1, -1, 0, 0];
    var directionY = [0, 0, 1, -1];

    // bfs
    var queue = [];
    queue.push({start: start, distance: 0});

    while (queue.length > 0) {
    // not level order traversal, because ball can roll more than 1 steps, the distance is different for every level
    // so each node has different distance with it.
        let currentResults = queue.shift();
        let current = currentResults.start;
        // let currentDistance = currentResults.distance;
        let curX = current[0], curY = current[1];

        for (let k = 0; k < 4; k++) {
            let rollResults = roll(maze, curX, curY, directionX[k], directionY[k]);
            let neighbor = rollResults.newStart;
            let steps = rollResults.steps;

            // because currentDistance might change, everytime reset it
            let currentDistance = currentResults.distance;
            currentDistance += steps;

            // even if it's already visited, we need to visited again, try to find the shortest path
            // update shorest distance in the visited matrix
            if (currentDistance > visited[destination[0]][destination[1]]) continue;// needs to do continue otherwise tel
            else if (visited[neighbor[0]][neighbor[1]] > currentDistance) {
                visited[neighbor[0]][neighbor[1]] = currentDistance;
                queue.push({start: neighbor, distance: currentDistance});
            }
        }

    }
    return visited[destination[0]][destination[1]] === Infinity ? -1 : visited[destination[0]][destination[1]];
};

function roll(maze, startX, startY, directionX, directionY) {
    let steps = 0;
    while (canRoll(maze, startX + directionX, startY + directionY)) {
        startX = startX + directionX;
        startY = startY + directionY;
        steps++;
    }
    return {newStart: [startX, startY], steps: steps};
}

function canRoll(maze, x, y) {
    if (x < 0 || y < 0 || x >= maze.length || y >= maze[0].length) return false;
    return maze[x][y] !== 1;
}
