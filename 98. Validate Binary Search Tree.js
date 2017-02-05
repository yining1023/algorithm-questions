// 98. Validate Binary Search Tree

// Given a binary tree, determine if it is a valid binary search tree (BST).

// Assume a BST is defined as follows:

// The left subtree of a node contains only nodes with keys less than the node's key.
// The right subtree of a node contains only nodes with keys greater than the node's key.
// Both the left and right subtrees must also be binary search trees.
// Example 1:
//     2
//    / \
//   1   3
// Binary tree [2,1,3], return true.
// Example 2:
//     1
//    / \
//   2   3
// Binary tree [1,2,3], return false.
// Hide Company Tags Amazon Microsoft Bloomberg Facebook
// Hide Tags Tree Depth-first Search
// Hide Similar Problems (M) Binary Tree Inorder Traversal (E) Find Mode in Binary Search Tree

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// divide and conquer
// all node on the right has to > root, so keep track of the min and the max!!!
// for root.left: min can be -Infinity, but maxValue is the root
// for root.right: max can be Infinity, but minValue is the root
var isValidBST = function(root) {
    // don't forget to return!!
    return validate(root, -Infinity, Infinity);
}

function validate(root, minValue, maxValue) {
    if (root === null) {
        return true;
    }
    
    // for the root, check if the root is between the current min and current max
    if (minValue >= root.val || maxValue <= root.val) {
        return false;
    }
    
    // go deep, also update the max and min.
    // for left, all nodes can only be between min - root.val
    // for right, all nodes can only be between root.val - max
    return validate(root.left, minValue, root.val) && validate(root.right, root.val, maxValue);
}

