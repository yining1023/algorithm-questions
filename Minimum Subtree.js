// Minimum Subtree
// Given a binary tree, find the subtree with minimum sum. Return the root of the subtree.

//  Notice

// LintCode will print the subtree which root is your return node.
// It's guaranteed that there is only one subtree with minimum sum and the given binary tree is not an empty tree.

// Have you met this question in a real interview? Yes
// Example
// Given a binary tree:

//      1
//    /   \
//  -5     2
//  / \   /  \
// 0   2 -4  -5 
// return the node 1.

// Tags 
// Binary Tree Depth First Search Microsoft
// Related Problems 
// Easy Subtree with Maximum Average 26 %
// Easy Binary Tree Longest Consecutive Sequence

/**
 * Definition of TreeNode:
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left, right;
 *     public TreeNode(int val) {
 *         this.val = val;
 *         this.left = this.right = null;
 *     }
 * }
 */
// traverse + divide and conquer
// result = left + right + root.val
public class Solution {
    /**
     * @param root the root of binary tree
     * @return the root of the minimum subtree
     */
    private TreeNode minSubtreeNode = null;
    int minSum = 0;
    
    public TreeNode findSubtree(TreeNode root) {
        // Write your code here
        helper(root);
        return minSubtreeNode;
    }
    
    private int helper(TreeNode root) {
        if (root == null) {
            return 0;
        }
        
        int left = helper(root.left);
        int right = helper(root.right);
        int result = left + right + root.val;
        
        if (minSubtreeNode == null 
        || result < minSum
        ) {
            // update it
            minSubtreeNode = root;
            minSum = result;
        }
        return result;
    }
}

