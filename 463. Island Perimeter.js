463. Island Perimeter
You are given a map in form of a two-dimensional integer grid where 1 represents land and 0 represents water.
Grid cells are connected horizontally/vertically (not diagonally).
The grid is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).
The island doesn't have "lakes" (water inside that isn't connected to the water around the island).
One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100.
Determine the perimeter of the island.

Example:

[[0,1,0,0],
 [1,1,1,0],
 [0,1,0,0],
 [1,1,0,0]]

Answer: 16
Explanation: The perimeter is the 16 yellow stripes in the image below:

Hide Company Tags Google
Hide Tags Hash Table

/**
 * @param {number[][]} grid
 * @return {number}
 */
// count each square, each square has 4 edges
// the tricky thing is that some of them have neighbors, if they have neighbors, there should be 2 less edges
// O(mn)
// loop over the matrix and count the number of islands;
// if the current dot is an island, count if it has any right neighbour or down neighbour;
// the result is islands * 4 - neighbours * 2
var islandPerimeter = function(grid) {
    let islands = 0, neighbors = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                islands++;
                // right or down
                if ((j + 1 < grid[i].length) && grid[i][j + 1] === 1) {
                    neighbors++;
                }// check right and down seperately, otherwise will miss some points that will right and down
                if ((i + 1 < grid.length) && grid[i + 1][j] === 1) {
                    neighbors++;
                }
            }
        }
    }
    return islands * 4 - neighbors * 2;
};
