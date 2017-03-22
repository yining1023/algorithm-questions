94. Binary Tree Inorder Traversal

Given a binary tree, return the inorder traversal of its nodes' values.

For example:
Given binary tree [1,null,2,3],
   1
    \
     2
    /
   3
return [1,3,2].

Note: Recursive solution is trivial, could you do it iteratively?

Hide Company Tags Microsoft
Hide Tags Tree Hash Table Stack
Hide Similar Problems (M) Validate Binary Search Tree (M) Binary Tree Preorder Traversal (H) Binary Tree Postorder Traversal (M) Binary Search Tree Iterator (M) Kth Smallest Element in a BST (H) Closest Binary Search Tree Value II (M) Inorder Successor in BST

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 1. iterative
var inorderTraversal = function(root) {
    var results = [];
    if (root === null) return results;

    var stack = [];
    var cur = root;
    while (true) {
        while (cur !== null) {
            stack.push(cur);
            cur = cur.left;
        }

        if (stack.length === 0) break;

        cur = stack.pop();
        results.push(cur.val);//.val not the whole node
        cur = cur.right;
    }

    return results;
};

// 2. recursion
// inorder
var inorderTraversal = function(root) {
    var results = [];
    if (root === null) return results;

    recursionHelper(root, results);

    return results;
};

function recursionHelper(root, results) {
    if (root === null) return;

    recursionHelper(root.left, results);
    results.push(root.val);// inorder
    recursionHelper(root.right, results);
}
