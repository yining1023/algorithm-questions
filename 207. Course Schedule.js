// 207. Course Schedule

// 207. Course Schedule
// Description  Submission  Discussion  Add to List
// Total Accepted: 68738
// Total Submissions: 224227
// Difficulty: Medium
// Contributors: Admin
// There are a total of n courses you have to take, labeled from 0 to n - 1.

// Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1]

// Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

// For example:

// 2, [[1,0]]
// There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.

// 2, [[1,0],[0,1]]
// There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

// Note:
// The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
// You may assume that there are no duplicate edges in the input prerequisites.
// click to show more hints.

// Hints:
// This problem is equivalent to finding if a cycle exists in a directed graph. If a cycle exists, no topological ordering exists and therefore it will be impossible to take all courses.
// Topological Sort via DFS - A great video tutorial (21 minutes) on Coursera explaining the basic concepts of Topological Sort.
// Topological sort could also be done via BFS.
// Hide Company Tags Apple Yelp Zenefits
// Hide Tags Depth-first Search Breadth-first Search Graph Topological Sort
// Hide Similar Problems (M) Course Schedule II (M) Graph Valid Tree (M) Minimum Height Trees

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

// bfs topological sorting!
var canFinish = function(numCourses, prerequisites) {
    let nodes = [],
        indegrees = [];
    // initialize the two aray
    for (let i = 0; i < numCourses; i++) {
        let node = {};
        // neighbor为一个array
        node.neighbors = [];
        nodes.push(node);
        indegrees.push(0);
    }

    // use prerequisite as their neighbors and indegree
    for (let j = 0; j < prerequisites.length; j++) {
        preNode = prerequisites[j][1];
        neighbor = prerequisites[j][0];
        nodes[preNode].neighbors.push(neighbor);

        indegrees[neighbor]++;
    }

    let queue = [];
    let count = 0;
    // push all nodes with 0 indegree
    for (let k = 0; k < indegrees.length; k++) {
        if (indegrees[k] === 0) {
            queue.push(nodes[k]);// push the real node in, not the indegree
        }
    }

    while (queue.length > 0) {
        let node = queue.shift();
        count++;
        console.log(node);
        node.neighbors.forEach((neighbor) => {
            indegrees[neighbor]--;
            if (indegrees[neighbor] === 0) queue.push(nodes[neighbor]);// push the real node in, not the neighbor index
        });

    }


    return count === numCourses;
};



// BFS
var canFinish = function(numCourses, prerequisites) {
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
        count = 0;

    for (let m = 0; m < indegrees.length; m++) {
        if (indegrees[m] === 0) {
            queue.push(nodes[m]);
        }
    }

    while (queue.length > 0) {
        let head = queue.shift();
        count++;
        for (var n = 0; n < head.neighbor.length; n++) {
            indegrees[head.neighbor[n]]--;
            if (indegrees[head.neighbor[n]] === 0) {
                queue.push(nodes[head.neighbor[n]]);
            }
        }
    }

    return count === numCourses;
};

// var constructGraph = function(numNodes, pre) {
//     // new一个graph的结构
//     var nodes = [];
//     for (var i = 0; i < numNodes; i++) {
//         var node = {};
//         node.neighbors = [];
//         nodes.push(node);
//     }
//     // 填上neighbor
//     for (var j = 0; j < pre.length; j++) {
//         var requiredCourse = pre[j][1];
//         var course = pre[j][0];
//         // pushing course that require required-course to it's neighbor
//         // when we go to the required-course, and traverse it's neighbors, we want to make sure that those neighbor doesn't have others that nodes
//         // that required those neighbor plus those neighbor's required-course
//         // example [1,0], [0,2], [2,1]
//         // 1 required 0, 0 required 2, and 2 required 1
//         // it creates loop
//         nodes[requiredCourse].neighbors.push(nodes[course]);
//     }
//     return nodes;
// }

// // Return true if there is a cycle detected.
// var dfs = function(startNode, parents) {
//     if (parents.indexOf(startNode) >= 0) return true;
//     if (startNode.visited) return false;

//     startNode.visited = true;
//     var neighbors = startNode.neighbors;
//     parents.push(startNode);
//     for (var i = 0; i < neighbors.length; i++) {
//         var hasCycle = dfs(neighbors[i], parents);
//         if (hasCycle) return true;
//     }
//     parents.pop();
// }

// var canFinish = function(numCourses, prerequisites) {
//     var nodes = constructGraph(numCourses, prerequisites);

//     for (var i = 0; i < nodes.length; i++) {
//         var parent = [];
//         var hasCycle = dfs(nodes[i], parent);

//         if (hasCycle) return false;
//     }
//     return true;
// };

