230. Kth Smallest Element in a BST

Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.

Note:
You may assume k is always valid, 1 ≤ k ≤ BST's total elements.

Follow up:
What if the BST is modified (insert/delete operations) often and you need to find the kth smallest frequently? How would you optimize the kthSmallest routine?

Hint:

Try to utilize the property of a BST.
What if you could modify the BST node's structure?
The optimal runtime complexity is O(height of BST).
Credits:
Special thanks to @ts for adding this problem and creating all test cases.

Hide Company Tags Bloomberg Uber Google
Hide Tags Binary Search Tree
Hide Similar Problems (M) Binary Tree Inorder Traversal

// 3 ways implemented: Binary Search, in-order iterative & recursive

// Solution 1. Binary Search + (dfs): most preferable
// pay attention to binary search divide condition,
// countLeft >= k, go to left; countLeft + 1 < k, go to right, if countLeft + 1 === k, means the root.val is the answer
// root.val is the (countLeft + 1)th element

// The optimal runtime complexity is O(height of BST).
var kthSmallest = function(root, k) {
    var countLeft = countNodes(root.left);

    // binary search
    if (countLeft >= k) return kthSmallest(root.left, k);//call itself! not the dfs function, dfs function will call itself
    else if (countLeft + 1 < k) return kthSmallest(root.right, k - countLeft - 1);//-1 is counted as current node

    return root.val;
};
// the below dfs is to find how many nodes are in the subtree that has the root as root.
function countNodes(root) {
    if (root === null) return 0;
    return countNodes(root.left) + 1 + countNodes(root.right);// the relastion between answer for left,right, and root
}

// Solution2: DFS in-order recursive:
// O(n) n is the number of all nodes
var kthSmallest = function(root, k) {
    var count = k, number = 0;// count = k, when find one node, count-- until count === 0
    inorderHelper(root);
    return number;

    function inorderHelper(root) {
        if (root === null) return;// either check if root===null, or before call helper(root.left), check if(root.left)
        inorderHelper(root.left);

        // alternative
        // no check if root === null, return
        // if (root.left) inorderHelper(root.left);

        count--;
        if (count === 0) {
            number = root.val;
            return;
        }
        inorderHelper(root.right);
    }
};

// Solution3: DFS in-order iterative:
// O(n) n is the number of all nodes
var kthSmallest = function(root, k) {
    if (root === null) return;

    var stack = [];
    var cur = root;
    var count = k;
    while (true) {
        while (cur !== null) {
            stack.push(cur);
            cur = cur.left;
        }
        if (stack.length === 0) break;// before pop, check if the stack is empty
        cur = stack.pop();
        count--;
        if (count === 0) return cur.val;
        cur = cur.right;
    }
    return -1;
};


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
// 二叉搜索树的特性，先序遍历的输出就是排序的结果。
// var kthSmallest = function(root, k) {
//     var count = 0;
//     var isFound = false;
//     var res = null;
//     inorder(root);
//     return res;

//     function inorder(node){
//         if(node !== null && !isFound){
//             inorder(node.left);
//             count++;
//             if(count === k){
//                 res = node.val;
//                 isFound = true;
//                 return;
//             }
//             inorder(node.right);
//         }
//     }
// };
