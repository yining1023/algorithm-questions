// 317. Shortest Distance from All Buildings

// You want to build a house on an empty land which reaches all buildings in the shortest amount of distance. You can only move up, down, left and right. You are given a 2D grid of values 0, 1 or 2, where:

// Each 0 marks an empty land which you can pass by freely.
// Each 1 marks a building which you cannot pass through.
// Each 2 marks an obstacle which you cannot pass through.
// For example, given three buildings at (0,0), (0,4), (2,2), and an obstacle at (0,2):

// 1 - 0 - 2 - 0 - 1
// |   |   |   |   |
// 0 - 0 - 0 - 0 - 0
// |   |   |   |   |
// 0 - 0 - 1 - 0 - 0
// The point (1,2) is an ideal empty land to build a house, as the total travel distance of 3+3+1=7 is minimal. So return 7.

// Note:
// There will be at least one building. If it is not possible to build such house according to the above rules, return -1.

// Hide Company Tags Google Zenefits
// Hide Tags Breadth-first Search
// Hide Similar Problems (M) Walls and Gates (H) Best Meeting Point

/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestDistance = function(grid) {
  if (grid === null || grid.length === 0 || grid[0].length === 0) {
    return -1;
  }
  const EMPTY = 0,
        BUILDING = 1,
        OBSTACLE = 2;

  let distGrid = [],
      vistedTime = [];
      
  for (var row = 0; row < grid.length; row++) {
    distGrid.push([]);
    vistedTime.push([]);
        
    for (var col = 0; col < grid[0].length; col++) {
        distGrid[row][col] = 0;
        vistedTime[row][col] = 0;
    }
  }
      
  let minDist = Infinity;
      
  const buildings = getCoordinates(BUILDING, grid);
  
  for (let k = 0; k < buildings.length; k++) {
      bfs(buildings[k].x, buildings[k].y, grid, distGrid, vistedTime); 
  }

  const empties = getCoordinates(EMPTY, grid);

  for (let s = 0; s < empties.length; s++) {
      // do not forget s
      // !== the number of the house!!! not 10
      if (vistedTime[empties[s].x][empties[s].y] !== buildings.length) {
          continue;
      }
      // do not forget s
      minDist = Math.min(minDist, distGrid[empties[s].x][empties[s].y]);
  }
  // If it is not possible to build such house according to the above rules, return -1.
  if (minDist === Infinity) {
      return -1;
  } else {
      return minDist;
  }
};

function getCoordinates(type, grid) {
  let coordinates = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === type) {
            coordinates.push({
                x: i,
                y: j
            });
        }
    }
  }
  return coordinates;
}

function inBound(x, y, grid) {
    if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) {
        return false;
    }
    return grid[x][y] === 0;
}

function bfs(begCol, begRow, grid, distGrid, vistedTime) {
  const deltaX = [1, 0, 0, -1],
        deltaY = [0, 1, -1, 0];
  let queue = [];
  let hash = {};

  queue.push([begCol, begRow]);
  hash[[begCol, begRow]] = true;
  
  let step = 0;
  while (queue.length > 0) {
      // level traversal, 3 loops!!!
      step++;
      let size = queue.length;

      for (let t = 0; t < size; t++) {
          let head = queue.shift();

          for (let d = 0; d < 4; d++) {
              // donnot forget [d]
              let newCoordinates = [head[0] + deltaX[d], head[1] + deltaY[d]];
                
              if (!inBound(newCoordinates[0], newCoordinates[1], grid)) {
                  continue;
              }
              
              // donnot forget check hash, otherwise time out
              if (hash[newCoordinates]) {
                  continue;
              }
              
              queue.push(newCoordinates);
              hash[newCoordinates] = true;
              
              // add to resutls!!
              distGrid[newCoordinates[0]][newCoordinates[1]] += step;
              vistedTime[newCoordinates[0]][newCoordinates[1]]++;
          }
      }
  }
}
