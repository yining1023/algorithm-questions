501. Find Mode in Binary Search Tree

Given a binary search tree (BST) with duplicates, find all the mode(s) (the most frequently occurred element) in the given BST.

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than or equal to the node's key.
The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
Both the left and right subtrees must also be binary search trees.
For example:
Given BST [1,null,2,2],
   1
    \
     2
    /
   2
return [2].

Note: If a tree has more than one mode, you can return them in any order.

Follow up: Could you do that without using any extra space? (Assume that the implicit stack space incurred due to recursion does not count).

Hide Company Tags Google
Hide Tags Tree
Hide Similar Problems (M) Validate Binary Search Tree

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
// DFS. Time: O(n), Space: O(n). each node is been through once?, map use O(n) space
// Use a map to store the count of each interger.
// Then simply find the largest count and return all the associated keys.
var findMode = function(root) {
    if (root === null) { return [];}
    let times = 0, mode = 0; res = [];
    let map = new Map();

    let count = recursionHelper(root, map);
    map.forEach( (value, key) => {
        if (value === count) {
            res.push(key);
        }
    });

    return res;
};

function recursionHelper(root, map) {
    if (root === null) {return 0;}
    if (map.has(root.val)) {
        map.set(root.val, map.get(root.val) + 1);
    } else {
        map.set(root.val, 1);
    }
    let left = recursionHelper(root.left, map);// pass in map too
    let right = recursionHelper(root.right, map);
    return Math.max(map.get(root.val), left, right);// return the most occursion times!
}

// in-order traversal, has order, stack
// O(N) time and O(1) Space
// Write BST Iterator class which gives the next element in_order.
// Now the problem reduces to finding mode in a sorted array.
// Instead of a BST iterator, we can use a recursive inorder traversal and store a class variable pre to indicate the previous integer.

// ******javascript, wrap the helper function in the main function before return value, otherwise it will return the orignal return value. No need to pass in the variables in the outter function. closure.
var findMode = function(root) {
    if (root === null) return [];
    var pre, count = 1, max = 0; // let count = 1 first, otherwise when check count === max, it will go it
    var list = [];

    inOrderTraverse(root, list);

    function inOrderTraverse(root) {
        if (root === null) return;

        inOrderTraverse(root.left);

        if (pre !== undefined) {// cannot use if(pre), when pre = 0, pre => false
            if (root.val === pre) {
                count++;
            }
            else
                count = 1;
        }// if pre === undefined, count = 1

        if (count > max) {
            max = count;
            list = [];
            list.push(root.val);
        } else if (count === max) {
            list.push(root.val); // [1, 2] at this moment, 1 '1', 1 '2', they are both most frequent number
        }

        pre = root.val; // move to next round

        inOrderTraverse(root.right);
    }

    return list;
};

// Divide and Conquer

// Mode lies entirely in left subtree, or in right subtree or the middle element is the mode.
// Time would be NlogN at best and space O(1)
