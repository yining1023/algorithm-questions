// 133. Clone Graph
// Description  Submission  Discussion  Add to List
// Total Accepted: 96578
// Total Submissions: 385676
// Difficulty: Medium
// Contributors: Admin
// Clone an undirected graph. Each node in the graph contains a label and a list of its neighbors.


// OJ's undirected graph serialization:
// Nodes are labeled uniquely.

// We use # as a separator for each node, and , as a separator for node label and each neighbor of the node.
// As an example, consider the serialized graph {0,1,2#1,2#2,2}.

// The graph has a total of three nodes, and therefore contains three parts as separated by #.

// First node is labeled as 0. Connect node 0 to both nodes 1 and 2.
// Second node is labeled as 1. Connect node 1 to node 2.
// Third node is labeled as 2. Connect node 2 to node 2 (itself), thus forming a self-cycle.
// Visually, the graph looks like the following:

//        1
//       / \
//      /   \
//     0 --- 2
//          / \
//          \_/
// Hide Company Tags Pocket Gems Google Uber Facebook
// Hide Tags Depth-first Search Breadth-first Search Graph
// Hide Similar Problems (M) Copy List with Random Pointer


/**
 * Definition for undirected graph.
 * function UndirectedGraphNode(label) {
 *     this.label = label;
 *     this.neighbors = [];   // Array of UndirectedGraphNode
 * }
 */

/**
 * @param {UndirectedGraphNode} graph
 * @return {UndirectedGraphNode}
 */
// 1. bfs get all nodes
// 2. copy nodes and store the old->new mapping information in a hash map
// 3. copy edges/neighbors
// /**
//  * Definition for undirected graph.
//  * function UndirectedGraphNode(label) {
//  *     this.label = label;
//  *     this.neighbors = [];   // Array of UndirectedGraphNode
//  * }
//  */

// /**
//  * @param {UndirectedGraphNode} graph
//  * @return {UndirectedGraphNode}
//  */
// 1. bfs get all nodes
// 2. copy nodes and store the old->new mapping information in a hash map
// 3. copy edges/neighbors
var cloneGraph = function(graph) {
    if (graph === null) {
        return graph;
    }
    
    // 1. dfs to get nodes
    let nodes = getNodes(graph);
    
    // 2. copy nodes and store the old node.label -> new node mapping information in a hash map
    let hash = {};

    for (let i = 0; i < nodes.length; i++) {
        let newNode = new UndirectedGraphNode(nodes[i].label);
        hash[nodes[i].label] = newNode;
    }
    
    // 3. copy edges/neighbors
    for (let j = 0; j < nodes.length; j++) {
        newNode = hash[nodes[j].label];
        for (let n = 0; n < nodes[j].neighbors.length; n++) {
            // use hash to get the new neighbor!
            let newNeighbor = hash[nodes[j].neighbors[n].label];
            newNode.neighbors.push(newNeighbor);
        }
    }
    
    // old node.label -> new node
    return hash[graph.label];
};

function getNodes(graph) {
    let nodes = [];
    let queue = [];
    let visited = new Map();

    queue.push(graph);
    visited.set(graph);
    
    while (queue.length > 0) {
        let head = queue.shift();
        nodes.push(head);
        for (let m = 0; m < head.neighbors.length; m++) {
            // 要使用node.label来当visited的key
            if (visited.has(head.neighbors[m]) !== true) {
                queue.push(head.neighbors[m]);
                visited.set(head.neighbors[m]);
            }
        }
    }
    return nodes;
}

// other method
// var cloneGraph = function(graph) {
//     if(!graph) {
//         return graph;
//     } else {
//         return dfs(graph, {});
//     }
    
//     function dfs(node, visited) {
//         var newNode = visited[node.label] = visited[node.label] || new UndirectedGraphNode(node.label);
        
//         for(var i = 0; i < node.neighbors.length; i++) {
//             var neighbor = node.neighbors[i];
//             newNode.neighbors[i] = visited[neighbor.label] = visited[neighbor.label] || dfs(neighbor, visited);
//         }
        
//         return newNode;
//     }
    
// };

