// Given a binary tree, find its maximum depth.

// The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

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
// // divide and conquer
var maxDepth = function(root) {
    if (root === null) {
        return 0;
    }
    // call itself!!!
    var leftDepth = maxDepth(root.left);
    var rightDepth = maxDepth(root.right);
    var depth = Math.max(leftDepth, rightDepth) + 1;
    
    return depth;
};

//traverse
// var maxDepth = function(root) {
//     var depth = 0;
//     // curdeth starts from 1, not 0!
//     helper(root, 1);

//     return depth;
    
//     function helper(root, curdepth) {
//         if (root === null) {
//             return;
//         }
        
//         // update depth!!
//         depth = Math.max(depth, curdepth);
    
//         helper(root.left, curdepth + 1);
//         helper(root.right, curdepth + 1);
//     }
// };