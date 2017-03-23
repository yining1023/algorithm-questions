297. Serialize and Deserialize Binary Tree

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

For example, you may serialize the following tree

    1
   / \
  2   3
     / \
    4   5
as "[1,2,3,null,null,4,5]", just the same as how LeetCode OJ serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.
Note: Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless.

Credits:
Special thanks to @Louis1992 for adding this problem and creating all test cases.

Hide Company Tags LinkedIn Google Uber Facebook Amazon Microsoft Yahoo Bloomberg
Hide Tags Tree Design
Hide Similar Problems (M) Encode and Decode Strings (M) Serialize and Deserialize BST

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
// The idea is simple: print the tree in pre-order traversal and use "X" to denote null node and split node with ",". We can use a StringBuilder for building the string on the fly. For deserializing, we use a Queue to store the pre-order traversal and since we have "X" as null node, we know exactly how to where to end building subtress.

// didn't use stack, divide and conquer, recursion
// serialize or deserialize 都是无脑的丢左边和右边
var serialize = function(root) {
    let results = [];
    serializer(root, results);
    return results.join(",");
};

function serializer(root, results) {
    if (root === null) {
        results.push("#");
        return;
    }
    results.push(root.val); // preorder remember to push itself
    serializer(root.left, results);
    serializer(root.right, results);
}

var deserialize = function(data) {
    data = data.split(",");
    let index = 0; // use index to loop the whole array
    return deserializer(data);

    function deserializer(data) {
        if (index >= data.length || data[index] === "#") return null;

        let node = new TreeNode(parseInt(data[index])); // string to int
        index++;// move to it's left
        node.left = deserializer(data);
        index++;// move to it's right
        node.right = deserializer(data);

        return node;
    }
};

// var serialize = function(root) {
//     var result = [];
//     serializer(root, result);

//     return result.join(",");
// };

// var serializer = function(node, output) {
//     if(node === null) {
//         output.push("#");
//         return;
//     }

//     output.push(node.val);
//     serializer(node.left, output);
//     serializer(node.right, output);
// }

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
// var deserialize = function(data) {
//     data = data.split(",");
//     var index = 0;

//     function deserializer(data) {
//         if(index > data.length || data[index] === "#") {
//             return null;
//         }

//         var node = new TreeNode(parseInt(data[index]));
//         index++;
//         node.left = deserializer(data);
//         index++;
//         node.right = deserializer(data);
//         return node;
//     }

//     return deserializer(data);
// };

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
