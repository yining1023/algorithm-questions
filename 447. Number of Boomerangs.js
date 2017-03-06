447. Number of Boomerangs

Given n points in the plane that are all pairwise distinct, a "boomerang" is a tuple of points (i, j, k) such that the distance between i and j equals the distance between i and k (the order of the tuple matters).

Find the number of boomerangs. You may assume that n will be at most 500 and coordinates of points are all in the range [-10000, 10000] (inclusive).

Example:
Input:
[[0,0],[1,0],[2,0]]

Output:
2

Explanation:
The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]]
Hide Company Tags Google
Hide Tags Hash Table
Hide Similar Problems (M) Line Reflection

/**
 * @param {number[][]} points
 * @return {number}
 */
// Time complexity:  O(n^2)
// Space complexity: O(n)
// For every i, we capture the number of points equidistant from i. Now for this i, we have to calculate all possible permutations of (j,k) from these equidistant points.
// Total number of permutations of size 2 from n different points is nP2 = n!/(n-2)! = n * (n-1). hope this helps.

var numberOfBoomerangs = function(points) {
    let map, res = 0;
    for (let i = 0; i < points.length; i++) {
        map = new Map();
        for (let j = 0; j < points.length; j++) {
            if (points[i] === points[j]) { continue; }
            let d = getDistance(points[i], points[j]);
            let originalTimes = map.has(d) ? map.get(d) : 0;
            map.set(d, originalTimes + 1);
        }
        map.forEach((value, key) => {
            res += value * (value - 1);// A(n)2 = n * (n - 1)
        });
        map.clear();
    }
    return res;
};

function getDistance(num1, num2) {
    let dx = num1[0] - num2[0];
    let dy = num1[1] - num2[1];
    
    return dx * dx + dy * dy;
}
