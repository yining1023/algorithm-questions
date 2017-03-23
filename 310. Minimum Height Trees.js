310. Minimum Height Trees

For a undirected graph with tree characteristics, we can choose any node as the root. The result graph is then a rooted tree. Among all possible rooted trees, those with minimum height are called minimum height trees (MHTs). Given such a graph, write a function to find all the MHTs and return a list of their root labels.

Format
The graph contains n nodes which are labeled from 0 to n - 1. You will be given the number n and a list of undirected edges (each edge is a pair of labels).

You can assume that no duplicate edges will appear in edges. Since all edges are undirected, [0, 1] is the same as [1, 0] and thus will not appear together in edges.

Example 1:

Given n = 4, edges = [[1, 0], [1, 2], [1, 3]]

        0
        |
        1
       / \
      2   3
return [1]

Example 2:

Given n = 6, edges = [[0, 3], [1, 3], [2, 3], [4, 3], [5, 4]]

     0  1  2
      \ | /
        3
        |
        4
        |
        5
return [3, 4]

Hint:

How many MHTs can a graph have at most?
Note:

(1) According to the definition of tree on Wikipedia: “a tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.”

(2) The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

Credits:
Special thanks to @dietpepsi for adding this problem and creating all test cases.

Hide Company Tags Google
Hide Tags Breadth-first Search Graph
Hide Similar Problems (M) Course Schedule (M) Course Schedule II


// 因为是无向图，可能从一头数是min height，但是从另一头数过来可能就很长
// 所以要找的是这个图的中点，不论从哪一头数过来都是一样的，也是可能的最小的min height
// 找到叶子节点 => 删掉叶子节点，找到新的叶子节点 => 知道剩下1个或者2个点，为结果。

// O(n) time, O(n) space

// For a tree we can do some thing similar. We start from every end, by end we mean vertex of degree 1 (aka leaves). We let the pointers move the same speed. When two pointers meet, we keep only one of them, until the last two pointers meet or one step away we then find the roots.
// It is easy to see that the last two pointers are from the two ends of the longest path in the graph.
// The actual implementation is similar to the BFS topological sort. Remove the leaves, update the degrees of inner vertexes. Then remove the new leaves. Doing so level by level until there are 2 or 1 nodes left. What's left is our answer!
// The time complexity and space complexity are both O(n).
// Note that for a tree we always have V = n, E = n-1.

// BFS topological sort

// 1. use map {node1, [edge1, edge2, edge3...]}
// 2. get leaves array
// 3. delete leaves, get next level leaves, until n <= 2, then return leaves

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
var findMinHeightTrees = function(n, edges) {
    if (n === 1) return [0];

    let map = new Map();
    for (let i = 0; i < n; i++) map.set(i, new Set());
    for (let j = 0; j < edges.length; j++) {
        let edge = edges[j];
        map.get(edge[0]).add(edge[1]);
        map.get(edge[1]).add(edge[0]);
    }

    let leaves = [];
    map.forEach((value, key) => {
        if (value.size === 1) // or value.size === 1 //[...value].length === 1
            leaves.push(key);
    });

    while (n > 2) {
        n -= leaves.length;
        let newLeaves = [];

        for (let k = 0; k < leaves.length; k++) {
            let leaf = leaves[k];
            let leafSet = map.get(leaf);
            let newLeaf = [...leafSet][0];
            map.get(newLeaf).delete(leaf);// delete it's link to the old leaf

            if (map.get(newLeaf).size === 1) {
                newLeaves.push(newLeaf);
            }
        }

        leaves = newLeaves;
    }

    return leaves;
};
