// Given a binary tree, return the preorder traversal of its nodes' values.

// For example:
// Given binary tree {1,#,2,3},
//    1
//     \
//      2
//     /
//    3
// return [1,2,3].

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
// divide and conquer
var preorderTraversal = function(root) {
    var results = [];
    if (root === null) {
        return results;
    }
    
    // try to calculate and save the result from left and right 
    var leftRes = preorderTraversal(root.left);
    var rightRes = preorderTraversal(root.right);
    
    // the relationship between left, right and results
    // push results.val!!!
    results.push(root.val);
    // use concat to join two arrays, assign it to a new variable, otherwise it won't work
    results = results.concat(leftRes);
    results = results.concat(rightRes);
    
    return results;
};

// traverse
var preorderTraversal = function(root) {
    var results = [];
    helper(root, results);
    return results;
};
function helper(root, results) {
    if (root === null) {
        return results;
    }
    
    results.push(root.val);
    helper(root.left, results);
    helper(root.right, results);
}

// non-recursion
// use stack, last in, first out.
// push root, 
// while stack is not empty, pop last one, push into results
// if has right, push into stack
// if has left, push into stack
// left is after right, so get pop first

var preorderTraversal = function(root) {
    var results = [];
    if (root === null) {
        return results;
    }
    var stack = [];

    stack.push(root);
    
    while(stack.length > 0) {
        // pop, return the last node!!!
        var node = stack.pop();
        
        // push node.VAL, not the node itself!!!!
        results.push(node.val);
        
        // this current node, ot root!!!!node.right, push node.right
        if (node.right !== null) {
            stack.push(node.right);
        }
        
        if (node.left !== null) {
            stack.push(node.left);
        }
    }
    
    return results;
};
