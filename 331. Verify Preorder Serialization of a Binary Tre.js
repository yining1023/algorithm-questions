331. Verify Preorder Serialization of a Binary Tree

One way to serialize a binary tree is to use pre-order traversal. When we encounter a non-null node, we record the node's value. If it is a null node, we record using a sentinel value such as #.

     _9_
    /   \
   3     2
  / \   / \
 4   1  #  6
/ \ / \   / \
# # # #   # #
For example, the above binary tree can be serialized to the string "9,3,4,#,#,1,#,#,2,#,6,#,#", where # represents a null node.

Given a string of comma separated values, verify whether it is a correct preorder traversal serialization of a binary tree. Find an algorithm without reconstructing the tree.

Each comma separated value in the string must be either an integer or a character '#' representing null pointer.

You may assume that the input format is always valid, for example it could never contain two consecutive commas such as "1,,3".

Example 1:
"9,3,4,#,#,1,#,#,2,#,6,#,#"
Return true

Example 2:
"1,#"
Return false

Example 3:
"9,#,#,1"
Return false

Credits:
Special thanks to @dietpepsi for adding this problem and creating all test cases.

Hide Company Tags Google
Hide Tags Stack

/**
 * @param {string} preorder
 * @return {boolean}
 */
// binary tree: root only has 0/1/2 children, 0 child: # #;

// Solution1: stack, Time complexity is O(n), space is also O(n) for the stack.
// using a stack, scan left to right
// case 1: we see a number, just push it to the stack
// case 2: we see #, check if the top of stack is also #
// if so, pop #, pop the number in a while loop, until top of stack is not #
// if not, push it to stack
// in the end, check if stack size is 1, and stack top is #

// when get a two "#" in a row, like [9, 3, 4, #, ] pop # and 4, but push the second # in.
// in the end, there should only be one # left in the stack
var isValidSerialization = function(preorder) {
    let stack = [];
    let strings = preorder.split(",");
    for (let i = 0; i < strings.length; i++) {
        let str = strings[i];
        while (str === "#" && stack[stack.length - 1] === "#") {// if it's # and the last one in stack is also #
        // repeat it, until there is no #, use WHILE!!!!!
            stack.pop();// pop the last "#"
            if (stack.length === 0) return false;
            stack.pop();// pop the one before the "#", could be a number, could be a #, because might just popped two things
        }
        stack.push(str);
    }

    return stack.length === 1 && stack[0] === "#";
};
