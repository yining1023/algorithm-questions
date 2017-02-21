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
// traverse, dfs!!! 和dfs 找到所有叶子结点，subset是一样的，只是换成了string
var binaryTreePaths = function(root) {
    var results = [];
    
    if (root === null) {
        return results;
    }
    
    // path is not an array, just a string
    var path = JSON.stringify(root.val);
    helper(root, path, results);

    return results;
};

function helper(root, path, results) {
    // leaf
    if (root.left === null && root.right === null) {
        results.push(path.slice());// deep copy
        return;
    }
    
    // go to left
    if (root.left !== null) {
        // push, helper, pop
        path = path + '->' + JSON.stringify(root.left.val);
        helper(root.left, path, results);
        var tempL = path.split('->');
        // to get ride of the last -> number!, split, 再join回去
        path = tempL.slice(0, tempL.length - 1).join("->");
    }
    
    // go to right
    if (root.right !== null) {
        path = path + '->' + JSON.stringify(root.right.val);
        helper(root.right, path, results);
        var tempR = path.split('->');
        path = tempR.slice(0, tempR.length - 1).join("->");
    }
}
