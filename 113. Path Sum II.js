// 113. Path Sum II

// 113. Path Sum II   Add to List QuestionEditorial Solution  My Submissions
// Total Accepted: 111834
// Total Submissions: 352896
// Difficulty: Medium
// Contributors: Admin
// Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.

// For example:
// Given the below binary tree and sum = 22,
//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1
// return
// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]
// Hide Company Tags Bloomberg
// Hide Tags Tree Depth-first Search
// Hide Similar Problems (E) Path Sum (E) Binary Tree Paths (E) Path Sum III

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    var results = [];
    if (root === null) {
        return results;
    }
    // path is the current nodes so far
    var path = [];
    path.push(root.val);
    helper(root, path, root.val, results, sum);
    return results;
};

function helper(root, path, subSum, results, sum) {
    // leaf
    if (root.left === null & root.right === null) {
        if (subSum === sum) {
            // deep copy
            results.push(path.slice()); 
        }
        return;
    }
    
    // go to left
    if (root.left !== null) {
        path.push(root.left.val);
        helper(root.left, path, subSum + root.left.val, results, sum);
        path.pop();
    }
    
    // go to right
    if (root.right !== null) {
        path.push(root.right.val);
        helper(root.right, path, subSum + root.right.val, results, sum);
        path.pop();
    }
}

