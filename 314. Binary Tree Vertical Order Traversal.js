314. Binary Tree Vertical Order Traversal

Given a binary tree, return the vertical order traversal of its nodes' values. (ie, from top to bottom, column by column).

If two nodes are in the same row and column, the order should be from left to right.

Examples:

Given binary tree [3,9,20,null,null,15,7],
   3
  /\
 /  \
 9  20
    /\
   /  \
  15   7
return its vertical order traversal as:
[
  [9],
  [3,15],
  [20],
  [7]
]
Given binary tree [3,9,8,4,0,1,7],
     3
    /\
   /  \
   9   8
  /\  /\
 /  \/  \
 4  01   7
return its vertical order traversal as:
[
  [4],
  [9],
  [3,0,1],
  [8],
  [7]
]
Given binary tree [3,9,8,4,0,1,7,null,null,null,2,5] (0's right child is 2 and 1's left child is 5),
     3
    /\
   /  \
   9   8
  /\  /\
 /  \/  \
 4  01   7
    /\
   /  \
   5   2
return its vertical order traversal as:
[
  [4],
  [9,5],
  [3,0,1],
  [8,2],
  [7]
]
Hide Company Tags Google Snapchat Facebook
Hide Tags Hash Table
Hide Similar Problems (M) Binary Tree Level Order Traversal

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// O(N) time! and O(logN) space?
// BFS(level order traversal) two queues(nodes, cols)+ map{col1: [node1.val, node2.val]}
// keep track of min max col

// BFS, put node, col into queue at the same time
// Every left child access col - 1 while right child col + 1
// This maps node into different col buckets
// Get col boundary min and max on the fly
// Retrieve result from cols

var verticalOrder = function(root) {
    let results = [];
    if (root === null) return results;

    let queue = [],
        cols = [],// two queues one for nodes, one for cul numbers
        map = new Map(),// map for col number => [node1, node2,....]
        min = 0,//min col number
        max = 0;// max col number

    queue.push(root);
    cols.push(0);// root has col number 0

    while (queue.length > 0) {
        let node = queue.shift();
        let col = cols.shift();

        if (!map.has(col)) map.set(col, []);
        map.get(col).push(node.val);

        if (node.left !== null) {
            queue.push(node.left);
            cols.push(col - 1);
            min = Math.min(min, col - 1);
        }

        if (node.right !== null) {
            queue.push(node.right);
            cols.push(col + 1);
            max = Math.max(max, col + 1);
        }
    }

    for (let i = min; i <= max; i++) {
        let col = map.get(i);
        results.push(col);
    }

    return results;
};
