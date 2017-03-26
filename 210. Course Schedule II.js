// 210. Course Schedule II

// There are a total of n courses you have to take, labeled from 0 to n - 1.

// Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

// Given the total number of courses and a list of prerequisite pairs, return the ordering of courses you should take to finish all courses.

// There may be multiple correct orders, you just need to return one of them. If it is impossible to finish all courses, return an empty array.

// For example:

// 2, [[1,0]]
// There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1]

// 4, [[1,0],[2,0],[3,1],[3,2]]
// There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0. So one correct course order is [0,1,2,3]. Another correct ordering is[0,2,1,3].

// Note:
// The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
// You may assume that there are no duplicate edges in the input prerequisites.
// click to show more hints.

// Hide Company Tags Facebook Zenefits
// Hide Tags Depth-first Search Breadth-first Search Graph Topological Sort
// Hide Similar Problems (M) Course Schedule (H) Alien Dictionary (M) Minimum Height Trees (M) Sequence Reconstruction

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */

// BFS
var findOrder = function(numCourses, prerequisites) {
    // new a graph structure
    let nodes = [];
    // new an array to save indegree
    let indegrees = [];

    for (let i = 0; i < numCourses; i++) {
        let node = {};
        // neighbor为一个array
        node.neighbor = [];
        nodes.push(node);

        // fill all indegrees with 0
        indegrees.push(0);
    }

    // fill in the neighbors, and indegrees
    for (let j = 0; j < prerequisites.length; j++) {
        neighborNode = prerequisites[j][0];
        preNode = prerequisites[j][1];
        nodes[preNode].neighbor.push(neighborNode);

        indegrees[neighborNode]++;
    }

    // bfs
    let queue = [],
        count = 0,
        order = [];// order would the answer, course order list

    for (let m = 0; m < indegrees.length; m++) {
        if (indegrees[m] === 0) {
            // only push the index to the queue
            queue.push(m);
        }
    }

    while (queue.length > 0) {
        let head = queue.shift();
        order[count] = head;//order[0] order[1]...
        count++;
        for (var n = 0; n < nodes[head].neighbor.length; n++) {
            indegrees[nodes[head].neighbor[n]]--;
            if (indegrees[nodes[head].neighbor[n]] === 0) {
                queue.push(nodes[head].neighbor[n]);
            }
        }
    }

    if (count === numCourses) {
        return order;
    }

    return [];
};
