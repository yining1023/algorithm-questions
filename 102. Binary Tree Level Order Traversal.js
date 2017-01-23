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

// use queue to first in first out to push them into temp
var levelOrder = function(root) {
    results = [];
    if (root === null) {
        return results;
    }
    
    var queue = [],
        temp = [],
        curCount = 1,
        nextLevCount = 0;
        
    queue.push(root);
    
    while (queue.length !== 0) {
        var p = queue.shift();
        // push p.val not p itself!! p is a treeNode
        temp.push(p.val);
        curCount--;
        
        if (p.left) {
            queue.push(p.left);
            nextLevCount++;
        }
        
        if (p.right) {
            queue.push(p.right);
            nextLevCount++;
        }
        
        if (curCount === 0) {
            results.push(temp);
            temp = [];
            curCount = nextLevCount;
            nextLevCount = 0;
        }
    }
    
    return results;
};
