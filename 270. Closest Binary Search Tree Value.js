270. Closest Binary Search Tree Value

Given a non-empty binary search tree and a target value, find the value in the BST that is closest to the target.

Note:
Given target value is a floating point.
You are guaranteed to have only one unique value in the BST that is closest to the target.
Hide Company Tags Microsoft Google Snapchat
Hide Tags Tree Binary Search
Hide Similar Problems (M) Count Complete Tree Nodes (H) Closest Binary Search Tree Value II

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} target
 * @return {number}
 */
// not possible to cannot choose which side to go
// if root > target, go to left; if root < target, go to right
// if the diff is smaller, update it
var closestValue = function(root, target) {
    let res = root.val;
    while (root !== null) {
        if (Math.abs(root.val - target) < Math.abs(res - target)) {
            res = root.val;
        }
        root = root.val > target ? root.left : root.right; // < target, go to right
    }
    return res;
};
