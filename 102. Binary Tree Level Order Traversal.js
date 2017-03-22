// 102. Binary Tree Level Order Traversal
// Description  Submission  Discussion  Add to List
// Total Accepted: 150914
// Total Submissions: 404065
// Difficulty: Medium
// Contributors: Admin
// Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its level order traversal as:
// [
//   [3],
//   [9,20],
//   [15,7]
// ]
// Hide Company Tags LinkedIn Facebook Amazon Microsoft Apple Bloomberg
// Hide Tags Tree Breadth-first Search
// Hide Similar Problems (M) Binary Tree Zigzag Level Order Traversal (E) Binary Tree Level Order Traversal II (E) Minimum Depth of Binary Tree (M) Binary Tree Vertical Order Traversal

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

// bfs level order traversal
// queue, while(queue.length > 0), size = queue.length, for (size), push to results
var levelOrder = function(root) {
    let results = [];
    if (root === null) return results;

    let queue = [];
    queue.push(root);

    while(queue.length > 0) {
        let size = queue.length;
        let tempLevel = [];
        for (let i = 0; i < size; i++) {
            let node = queue.shift();
            tempLevel.push(node.val);

            // remember to push new nodes in in the for loop!!!! not outside of the for loop
            // whenever shift one node out, push it's left and right into the queue
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        results.push(tempLevel);
    }

    return results;
};

var levelOrder = function(root) {
    let results = [];
    if (root === null) {
        return results;
    }

    let queue = [];
    queue.push(root);

    while(queue.length > 0) {
        let size = queue.length;
        let level = [];
        for (let i = 0; i < size; i++) {
            let head = queue.shift();
            // push its val not the whole tree node!!!
            level.push(head.val);
            if (head.left !== null) {
                queue.push(head.left);
            }
            if (head.right !== null) {
                queue.push(head.right);
            }
        }
        results.push(level);
    }

    return results;
}

// BFS!!
// var levelOrder = function(root) {
//     results = [];
//     if (root === null) {
//         return results;
//     }

//     var queue = [],
//         temp = [],
//         curCount = 1,
//         nextLevCount = 0;

//     queue.push(root);

//     while (queue.length !== 0) {
//         var p = queue.shift();
//         // push p.val not p itself!! p is a treeNode
//         temp.push(p.val);
//         curCount--;

//         if (p.left) {
//             queue.push(p.left);
//             nextLevCount++;
//         }

//         if (p.right) {
//             queue.push(p.right);
//             nextLevCount++;
//         }

//         // means the level is over
//         if (curCount === 0) {
//             results.push(temp);
//             // reset
//             temp = [];
//             curCount = nextLevCount;
//             nextLevCount = 0;
//         }
//     }

//     return results;
// };
