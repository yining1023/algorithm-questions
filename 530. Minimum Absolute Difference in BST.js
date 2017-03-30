530. Minimum Absolute Difference in BST

Given a binary search tree with non-negative values, find the minimum absolute difference between values of any two nodes.

Example:

Input:

   1
    \
     3
    /
   2

Output:
1

Explanation:
The minimum absolute difference is 1, which is the difference between 2 and 1 (or between 2 and 3).
Note: There are at least two nodes in this BST.

Hide Company Tags Google
Hide Tags Binary Search Tree
Hide Similar Problems (E) K-diff Pairs in an Array

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
// BSearchT, in order traverse, get all nodes, for current and prev, get diff
// O(n) time
var getMinimumDifference = function(root) {
    var pre, minDiff = Infinity;
    inOrderTraverse(root);

    function inOrderTraverse(root) {
        if (root === null) return;
        inOrderTraverse(root.left);

        if (pre !== undefined) // cannot say if (pre)!!! because when pre = 0, pre => false, !pre => true!!
            minDiff = Math.min(minDiff, root.val - pre); // math.abs(x - y), don't forget - !

        pre = root.val;
        inOrderTraverse(root.right);
    }

    return minDiff;
};
