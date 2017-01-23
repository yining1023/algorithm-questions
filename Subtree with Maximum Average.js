// Subtree with Maximum Average
// Given a binary tree, find the subtree with maximum average. Return the root of the subtree.
// Example
// Given a binary tree:

//      1
//    /   \
//  -5     11
//  / \   /  \
// 1   2 4    -2 
// return the node 11.

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
// version 1: Traverse + Divide Conquer

// use result type!, sum and size
public class Solution {
    private class ResultType {
        public int sum, size;
        public ResultType(int sum, int size) {
            this.sum = sum;
            this.size = size;
        }
    }
    
    // globle variables to keep track of the maximum!!
    private TreeNode subtree = null;
    private ResultType subtreeResult = null;
    
    /**
     * @param root the root of binary tree
     * @return the root of the maximum average of subtree
     */
    public TreeNode findSubtree2(TreeNode root) {
        helper(root);
        return subtree;
    }
    
    private ResultType helper(TreeNode root) {
        if (root == null) {
            return new ResultType(0, 0);
        }
        
        ResultType left = helper(root.left);
        ResultType right = helper(root.right);
        // relationship between left, right, result
        ResultType result = new ResultType (
            left.sum + right.sum + root.val,
            left.size + right.size + 1
        );
        
        // don't forget when subtree == null at the beginning
        if (subtree == null || subtreeResult.sum * result.size < result.sum * subtreeResult.size
        ) {
            subtree = root;
            subtreeResult = result;
        }
        return result;
    }
}