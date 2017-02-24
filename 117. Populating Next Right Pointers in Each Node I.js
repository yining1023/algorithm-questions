// 117. Populating Next Right Pointers in Each Node II

// Follow up for problem "Populating Next Right Pointers in Each Node".

// What if the given tree could be any binary tree? Would your previous solution still work?

// Note:

// You may only use constant extra space.
// For example,
// Given the following binary tree,
//          1
//        /  \
//       2    3
//      / \    \
//     4   5    7
// After calling your function, the tree should look like:
//          1 -> NULL
//        /  \
//       2 -> 3 -> NULL
//      / \    \
//     4-> 5 -> 7 -> NULL
// Hide Company Tags Microsoft Bloomberg Facebook
// Hide Tags Tree Depth-first Search
// Hide Similar Problems (M) Populating Next Right Pointers in Each Node

不同于上一题，这题的二叉树并不是完全二叉树，
我们不光需要提供first指针用来表示一层的第一个元素，
同时也需要使用另一个lst指针表示该层上一次遍历的元素。那么我们只需要处理好如何设置last的next指针就可以了。

// /**
//  * Definition for binary tree with next pointer.
//  * function TreeLinkNode(val) {
//  *     this.val = val;
//  *     this.left = this.right = this.next = null;
//  * }
//  */

// /**
//  * @param {TreeLinkNode} root
//  * @return {void} Do not return anything, modify tree in-place instead.
//  */

// this doesn't work 
// var connect = function(root) {
//     if (root === null) {
//         return;
//     }
    
//     var parent = root;
//     // make next = null first, because parent.left might be null
//     var next, 
//         prev;

//     while (parent !== null) {
//         // having a new level, set prev = null, next = null
//         next = null;
//         prev = null;
        
//         while (parent !== null) {
//             // find the first one on the next level
//             if (next === null) {
//                 next = (parent.left !== null) ? parent.left : parent.right;
//             }
            
//             if (parent.left !== null) {
//                 if (prev !== null) {
//                     prev.next = parent.left;
//                     prev = prev.next;
//                 } else {
//                     prev = parent.left;
//                 }
//             }
            
//             if (parent.right !== null) {
//                 if (prev !== null) {
//                     prev.next = parent.left;
//                     prev = prev.next;
//                 } else {
//                     prev = parent.right;
//                 }
//             }

//             // move parent to next too
//             parent = parent.next;
//         }
        
//         // go to th next level
//         parent = next;
//     }
// }

// java
public class Solution {
    public void connect(TreeLinkNode root) {
        if (root == null) {
            return;
        }

        TreeLinkNode parent = root;
        TreeLinkNode pre;
        TreeLinkNode next;
        while (parent != null) {
            pre = null;
            next = null;
            while (parent != null) {
                if (next == null){
                    next = (parent.left != null) ? parent.left: parent.right;
                }

                if (parent.left != null){
                    if (pre != null) {
                        pre.next = parent.left;
                        pre = pre.next;
                    } else {
                        pre = parent.left;
                    }
                }

                if (parent.right != null) {
                    if (pre != null) {
                        pre.next = parent.right;
                        pre = pre.next;
                    } else {
                        pre = parent.right;
                    }
                }
                parent = parent.next;
            }
            parent = next;
        }
    }
}

// Javascript
var connect = function(root) {
    if(!root) {
        return;
    }
    
    // leftEst is used to track the current left most node
    var leftEst = root;
    
    while(leftEst !== null) {
        var cur = leftEst;
        // dummy is used to point to the next level's leftEst
        var dummy = new TreeLinkNode(0);
        var pre = dummy;
        // for each level we use leftEst and leftEst next to achieve level traversal
        while(cur !== null) {
            if(cur.left !== null) {
                pre.next = cur.left;
                pre = pre.next;
            }
            
            if(cur.right !== null) {
                pre.next = cur.right;
                pre = pre.next;
            }
            
            cur = cur.next;
        }

        leftEst = dummy.next;
    }
};
