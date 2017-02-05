// 261. Graph Valid Tree
// Description  Submission  Discussion  Add to List
// Total Accepted: 29142
// Total Submissions: 79265
// Difficulty: Medium
// Contributors: Admin
// Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.

// For example:

// Given n = 5 and edges = [[0, 1], [0, 2], [0, 3], [1, 4]], return true.

// Given n = 5 and edges = [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]], return false.

// Hint:

// Given n = 5 and edges = [[0, 1], [1, 2], [3, 4]], what should your return? Is this case a valid tree?
// According to the definition of tree on Wikipedia: “a tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.”
// Note: you can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.

// Hide Company Tags Google Facebook Zenefits
// Hide Tags Depth-first Search Breadth-first Search Graph Union Find
// Hide Similar Problems (M) Course Schedule (M) Number of Connected Components in an Undirected Graph


/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
// 1. n-1 edges
// 2. from one node, you can get all the other nodes, bfs
// 不要在外面放全局变量 放到里面去 不然过不了
var validTree = function(n, edges) {
    if (n <= 0) {
        return false;
    }

    // 1. n-1 edges
    if (edges.length !== n - 1) {
        return false;
    }
    
    // 1.5 initialize a Graph
    nodes = initializeGraph(n, edges, []);

    // 2. from one node, you can get all the other nodes
    // bfs
    let queue = [];
    let visited = {};
    queue.push(nodes[0]);
    // 是key 不是整个node
    visited[0] = true;

    let numNodes = 0;

    while(queue.length !== 0) {
        let size = queue.length;

        for (let j = 0; j < size; j++) {
            let head = queue.shift();
            numNodes++;

            for (let q = 0; q < head.neighbor.length; q++) {
                // check is the key is in a hash map!!!
                if (visited[head.neighbor[q]] !== true) {
                    queue.push(nodes[head.neighbor[q]]);
                    visited[head.neighbor[q]] = true;
                }
            }
        }
    }
    
    return numNodes === n;
};

function initializeGraph(n, edges, nodes) {
    // initialize the [];
    for (let m = 0; m < n; m++) {
        node = {};
        node.neighbor = [];
        nodes.push(node);
    }
        
    // fill in the neighbors
    for (let i = 0; i < edges.length; i++) {
        let thisNode = edges[i][0];
        let neiNode = edges[i][1];
        nodes[thisNode].neighbor.push(neiNode);
        nodes[neiNode].neighbor.push(thisNode);
    }
    return nodes;
}
