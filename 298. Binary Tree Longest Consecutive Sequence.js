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
var maxLength;
var longestConsecutive = function(root) {
    maxLength = 0;
    helper(root);
    return maxLength;
};

function helper(root) {
    if (root === null) {
        return 0;
    }

    var subtreeLength = 1;
    
    var left = helper(root.left);
    var right = helper(root.right);
    
    if (root.left !== null && root.left.val - root.val === 1 && left >= right) {
        subtreeLength = left + 1;
    } else if (root.right !== null && root.right.val - root.val === 1 && right >= left) {
        subtreeLength = right + 1;
    }
    
    if (subtreeLength > maxLength) {
        maxLength = subtreeLength;
    }
    
    return subtreeLength;
}


