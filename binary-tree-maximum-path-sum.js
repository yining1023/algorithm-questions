// Given a binary tree, find the maximum path sum.

// For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.

// For example:
// Given the below binary tree,

//        1
//       / \
//      2   3
// Return 6.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// consider the relationship between the results for root, root.left, root.right, max or addAll
// using .root2any .any2any data structure
var maxPathSum = function(root) {
    var result = helper(root);
    return result.any2any;
}

function helper (root) {
    // root to any node
    // -Infinity capital I!!!!!
    if (root === null) {
        return {root2any: -Infinity, 
                any2any: -Infinity};
    }
    
    // call the helper itself, not the whole function
    var left = helper(root.left);
    var right = helper(root.right);
    
    // don't forget it is .root2any!!! not left itself
    var root2any = Math.max(0, left.root2any, right.root2any) + root.val;
    var any2any = Math.max(left.any2any, right.any2any);

    // any2any here is the max of all left, all right, left + root + right!!!!
    any2any = Math.max(Math.max(0, left.root2any) + Math.max(0, right.root2any) + root.val, any2any);

    return {root2any: root2any, 
            any2any: any2any};
}
