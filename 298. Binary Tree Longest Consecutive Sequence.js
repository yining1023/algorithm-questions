// 298. Binary Tree Longest Consecutive Sequence

// Given a binary tree, find the length of the longest consecutive sequence path.

// The path refers to any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The longest consecutive path need to be from parent to child (cannot be the reverse).

// For example,
//    1
//     \
//      3
//     / \
//    2   4
//         \
//          5
// Longest consecutive sequence path is 3-4-5, so return 3.
//    2
//     \
//      3
//     /
//    2
//   /
//  1
// Longest consecutive sequence path is 2-3,not3-2-1, so return 2.
// Hide Company Tags Google
// Hide Tags Tree
// Hide Similar Problems (H) Longest Consecutive Sequence

// JAVA
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

// traverse and divide and conquer
public class Solution {
    /**
     * @param root the root of binary tree
     * @return the length of the longest consecutive sequence path
     */
    int maxLength;

    public int longestConsecutive(TreeNode root) {
        // Write your code here
        maxLength = 0;
        helper(root);
        return maxLength;
    }

    private int helper(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int left = helper(root.left);
        int right = helper(root.right);
        int subtreeLength = 1;

        if (root.left != null && root.left.val - root.val == 1
            && left >= right) {
            subtreeLength = left + 1;
        } else if (root.right != null && root.right.val - root.val == 1
            && right >= left){
            subtreeLength = right + 1;
        }

        if (subtreeLength > maxLength) {
            maxLength = subtreeLength;
        }

        return subtreeLength;
    }
}

// JAVASCRIPT
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
// dfs recursion without global var
var longestConsecutive = function(root) {
    if (root === null) return 0;
    // count's initial value is 1!, count the root in
    return Math.max(dfs(root.left, 1, root.val), dfs(root.right, 1, root.val));
};

// definition of dfs: takes the the next node, current count, current value in, find the next count
function dfs(root, count, value) {
    if (root === null) return count;

    // get the current count before go in, count depends on if root.val-value === 1,
    // yes, count++, no, reset count = 1, means give up the former path, go in
    if (root.val - value === 1)
        count++;
    else
        count = 1;//reset count

    let left = dfs(root.left, count, root.val);
    let right = dfs(root.right, count, root.val);

    return Math.max(right, left, count);
}

// divide and conquer, recursion with global var
var maxLength;
var longestConsecutive = function(root) {
    maxLength = 0;
    helper(root);
    return maxLength;
};

function helper(root) {
    if (root === null)
        return 0;

    var subtreeLength = 1;

    var left = helper(root.left);
    var right = helper(root.right);

    if (root.left !== null && root.left.val - root.val === 1) {
        subtreeLength = left + 1;
    } else if (root.right !== null && root.right.val - root.val === 1) {
        subtreeLength = right + 1;
    }

    if (subtreeLength > maxLength)
        maxLength = subtreeLength;

    return subtreeLength;
}
