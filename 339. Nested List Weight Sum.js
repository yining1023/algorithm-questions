339. Nested List Weight Sum

Given a nested list of integers, return the sum of all integers in the list weighted by their depth.

Each element is either an integer, or a list -- whose elements may also be integers or other lists.

Example 1:
Given the list [[1,1],2,[1,1]], return 10. (four 1's at depth 2, one 2 at depth 1)

Example 2:
Given the list [1,[4,[6]]], return 27. (one 1 at depth 1, one 4 at depth 2, and one 6 at depth 3; 1 + 4*2 + 6*3 = 27)

Hide Company Tags LinkedIn
Hide Tags Depth-first Search
Hide Similar Problems (M) Nested List Weight Sum II

/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @param {NestedInteger[]} nestedList
 * @return {number}
 */
// nested, 一层一层的，需要递归！
// sum放到helper里面去
var depthSum = function(nestedList) {
    return helper(nestedList, 1);
};

// take nestedList, and depth, return the sum of this current nestedList
function helper(nestedList, depth) {
    // exit
    if (nestedList === null || nestedList.length === 0) {
        return 0;
    }
    
    let sum = 0;
    nestedList.forEach(function(list) {
        // isInteger() add ()!
        if (list.isInteger()) {
            // need to * depth of this level!!
            sum += list.getInteger() * depth;
        } else {
            // use list.getList! add the returned sum to the sum at this level! not just return helper
            sum += helper(list.getList(), depth + 1);
        }
    });
    return sum;
}

// non-recursion, bfs
var depthSum = function(nestedList) {
    if (nestedList === null || nestedList.length === 0) {
        return 0;
    }
    
    let queue = [];
    let sum = 0;
    nestedList.forEach(function(list) {
        queue.push(list);
    });
    
    let depth = 0;
    while (queue.length > 0) {
        let size = queue.length;
        // depth++ at this level
        depth++;
        for (let i = 0; i < size; i++) {
            let nestedInt = queue.shift();
            if (nestedInt.isInteger()) {
                // * depth!!!!
                sum += nestedInt.getInteger() * depth;
            } else {
                // if it's a list, loop throught it, push each element in, not push the whole array
                // need to peel it one level down! otherwise, when it's shift(), nothing will change
                let newList = nestedInt.getList();
                for (let j = 0; j < newList.length; j++) {
                    queue.push(newList[j]);
                }
            }
        }
    }
    return sum;
};
