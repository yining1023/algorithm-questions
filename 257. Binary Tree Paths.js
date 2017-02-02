// 257. Binary Tree Paths

// Given a binary tree, return all root-to-leaf paths.

// For example, given the following binary tree:

//    1
//  /   \
// 2     3
//  \
//   5
// All root-to-leaf paths are:

// ["1->2->5", "1->3"]
// Credits:
// Special thanks to @jianchao.li.fighter for adding this problem and creating all test cases.

// Hide Company Tags Google Apple Facebook
// Hide Tags Tree Depth-first Search
// Hide Similar Problems (M) Path Sum II

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
 
var results;
var binaryTreePaths = function(root) {
    results = [];
    
    if (root === null) {
        return results;
    }
    
    // path is not an array, just a string
    var path = JSON.stringify(root.val);
    helper(root, path);

    return results;
};

function helper(root, path) {
    // leaf
    if (root.left === null && root.right === null) {
        results.push(path.slice());
        return;
    }
    
    // go to left
    if (root.left !== null) {
        path = path + '->' + JSON.stringify(root.left.val);
        helper(root.left, path);
        var tempL = path.split('->');
        // to get ride of the last -> number!
        path = tempL.slice(0, tempL.length - 1).join("->");
    }
    
    // go to right
    if (root.right !== null) {
        path = path + '->' + JSON.stringify(root.right.val);
        helper(root.right, path);
        var tempR = path.split('->');
        path = tempR.slice(0, tempR.length - 1).join("->");
    }
}
