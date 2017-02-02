// Given a binary tree, flatten it to a linked list in-place.

// For example,
// Given

//          1
//         / \
//        2   5
//       / \   \
//      3   4   6
// The flattened tree should look like:
//    1
//     \
//      2
//       \
//        3
//         \
//          4
//           \
//            5
//             \
//              6
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
 
// preorder traversal!
// divide and conquer
var flatten = function(root) {
    helper(root);
};

var helper = function(root) {
    if (root === null) {
        return;
    }
    // return the last node!!! not really the root
    // it's helper not the main function flatten!!!
    var leftLast = helper(root.left);
    var rightLast = helper(root.right);
    
    // if there is leftLast
    // insert root.left to root.right!!!!
    // 3 steps
    // leftLast.right = root.right
    // root.right = root.left
    // root.left = null
    if (leftLast !== null && leftLast !== undefined) {
        // = root.right, NOT rightLast!!!!
        leftLast.right = root.right;
        root.right = root.left;
        root.left = null;
    }

    // if there is only rightLast, do nothing
    if (rightLast !== null && rightLast !== undefined) {
        return rightLast;
    }
        
    if (leftLast !== null && leftLast !== undefined) {
        return leftLast;
    }
    
    // if no leftLast or rightLast, return the root alone
    return root;
}


var flatten = function(root) {
    helper(root);
};

function helper(root) {
    if (root === null) {
        return root;
    }
    
    var leftLast = helper(root.left);
    var rightLast = helper(root.right);
    
    // move left to the right, update the tree
    if (leftLast !== undefined && leftLast !== null) {
        leftLast.right = root.right;
        root.right = root.left;
        root.left = null;
    }
    
    if (rightLast !== null && rightLast !== undefined) {
        return rightLast;
    }
    
    // the reason that we need to return leftLast is that the upper level needs it
    // if there is no rightLast, the leftLast should connect to the upper root.right
    // leftLast is just the last node, node the whole sequence
    if (leftLast !== null && leftLast !== undefined) {
        return leftLast;
    }
    
    return root;
}

