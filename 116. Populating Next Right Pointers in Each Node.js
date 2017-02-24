// 116. Populating Next Right Pointers in Each Node

// Total Accepted: 116905
// Total Submissions: 316913
// Difficulty: Medium
// Contributors: Admin
// Given a binary tree

//     struct TreeLinkNode {
//       TreeLinkNode *left;
//       TreeLinkNode *right;
//       TreeLinkNode *next;
//     }
// Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

// Initially, all next pointers are set to NULL.

// Note:

// You may only use constant extra space.
// You may assume that it is a perfect binary tree (ie, all leaves are at the same level, and every parent has two children).
// For example,
// Given the following perfect binary tree,
//          1
//        /  \
//       2    3
//      / \  / \
//     4  5  6  7
// After calling your function, the tree should look like:
//          1 -> NULL
//        /  \
//       2 -> 3 -> NULL
//      / \  / \
//     4->5->6->7 -> NULL
// Hide Company Tags Microsoft
// Hide Tags Tree Depth-first Search
// Hide Similar Problems (M) Populating Next Right Pointers in Each Node II (M) Binary Tree Right Side View

思路：

能解II的算法必然能解I，所以这里只讨论II的解。

递推：在第i层的所有next pointer都连接好的情况下，如何连接第i+1层的next pointer?
显然从第i层的最左节点开始依次通过next pointer遍历这一层，
同时将他们的children，即第i+1层的节点依次通过next pointer连接起来。连接的时候要分情况处理。

初始情况：对于顶层，只有一个节点root，所以该层连接已经完成。

/**
 * Definition for binary tree with next pointer.
 * function TreeLinkNode(val) {
 *     this.val = val;
 *     this.left = this.right = this.next = null;
 * }
 */

/**
 * @param {TreeLinkNode} root
 * @return {void} Do not return anything, modify tree in-place instead.
 */
var connect = function(root) {
    // root.next === null because of its data structure, TreeLinkNode
    
    // divide it into different situations, if null, if its left, it its right 
    
    // if === null, exit (when to exit)
    if (root === null) {
        return;
    }
    
    if (root.left) {
        root.left.next = root.right;
    }
    
    if (root.right) {
        // because the level before is already linked, you can use root.next to find its next one
        // only check if root.next exit, if it exit, root.next.left either exit either === null
        root.right.next = root.next ? root.next.left : null;
    }
    
    connect(root.left);
    connect(root.right);
};

// solution 2
var connect = function(root) {
    if (root === null) {
        return;
    }
    
    var parent = root,
        next = parent.left;

    while (parent !== null && next !== null) {
        // having a new level, set prev = null
        var prev = null;
        
        while (parent !== null) {
            if (prev === null) {
                prev = parent.left;
            } else {
                prev.next = parent.left;
                prev = prev.next;
            }
            
            if (prev) {
                prev = {};
            }
            prev.next = parent.right;
            prev = prev.next;

            // move parent to next too
            parent = parent.next;
        }
        
        // go to th next level
        parent = next;
        next = parent.left;
    }
};

