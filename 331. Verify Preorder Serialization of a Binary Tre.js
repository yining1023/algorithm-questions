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


// O(n)
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

// Soluton 2: indegree and outdegree
// In a binary tree, if we consider null as leaves, then
// O(n)
// root (2 children) provides 2 outdegree and 0 indegree
// all non-null node provides 2 outdegree and 1 indegree (2 children and 1 parent), except root
// all null node provides 0 outdegree and 1 indegree (0 child and 1 parent).
// Suppose we try to build this tree. During building, we record the difference between out degree and in degree diff = outdegree - indegree. When the next node comes, we then decrease diff by 1, because the node provides an in degree. If the node is not null, we increase diff by 2, because it provides two out degrees. If a serialization is correct, diff should never be negative and diff will be zero when finished.
// edge case: "9, #, #" dif = 2-1-1 = 0
var isValidSerialization = function(preorder) {
    var diff = 1;// root should be +2, normal node is +2 -1, # is -1; so at first diff = 1, and treat root as a normal root
    var strings = preorder.split(",");
    for (let i = 0; i < strings.length; i++) {
        diff--;// diff-- first!! every node has to --, example: "#,7,6,9" root is null, false, 1-1-1<0
        if (diff < 0) return false;// check if < 0
        if (strings[i] !== "#") diff += 2;// normal node 2 outdegree
    }
    return diff === 0;
};
