// Given a binary tree, determine if it is height-balanced.

// For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

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
 
// base on find the max depth of a binary tree, compare depth of left, and right, return isbalanced left && right
// (1)left, right are both balanced, (2)and depth left right is no more than 1.

var isBalanced = function(root) {
    if (root === null) {
        return true;
    }
    
    var leftDepth = findDepth(root.left);
    var rightDepth = findDepth(root.right);
    
    if (Math.abs(leftDepth - rightDepth) <= 1 && isBalanced(root.right) && isBalanced(root.left)) {
        return true;
    }
    
    return false;
}

function findDepth(root) {
    if (root === null) {
        return 0;
    }
    
    var leftDepth = findDepth(root.left);
    var rightDepth = findDepth(root.right);
    
    return Math.max(leftDepth, rightDepth, 0) + 1;
}


// second time
var isBalanced = function(root) {
    if (root === null) {
        return true;
    }
    
    var leftDepth = findDepth(root.left);
    var rightDepth = findDepth(root.right);
    
    if (Math.abs(leftDepth - rightDepth) <= 1) {
        return (isBalanced(root.left) && isBalanced(root.right));
    }
    
    return false;
};

function findDepth(root) {
    if (root === null) {
        return 0;
    }

    var lDepth = findDepth(root.left);
    var rDepth = findDepth(root.right);
    
    // max of left depth, right depth!!! not max of root.left, root.right!!!
    return Math.max(lDepth, rDepth) + 1;
}
