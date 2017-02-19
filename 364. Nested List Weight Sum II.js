364. Nested List Weight Sum II
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
 *     Set this NestedInteger to hold a single integer equal to value.
 *     @return {void}
 *     this.setInteger = function(value) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     @return {void}
 *     this.add = function(elem) {
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
// have another helper(traverse function) to find the maxDepth for the first level
var depthSumInverse = function(nestedList) {
    // get the maxDepth for the first level
    let maxDepth = getDepth(nestedList, 1);
    return helper(nestedList, maxDepth);
};

function getDepth(nestedList, depth) {
    if (nestedList === null || nestedList.length === 0) {
        return depth;
    }
    // save depth to maxDepth
    // maxDepth represents the max depth at that level, 
    // e.g. [[[[55]]],[[31]],[99],[],75]
    // at lvl 1, we want to know which [[[55]]], [[31]], [99], [], 75
    // has the maxDepth
    let maxDepth = depth;
    nestedList.forEach(function(list) {
        if (!list.isInteger()) {
            // getList()!!!
            // 没准这一位置下去不是最深的
            maxDepth = Math.max(maxDepth, getDepth(list.getList(), depth + 1));
        } 
    });
    return maxDepth;
}

// take nestedList, and depth, return the sum of this current nestedList
function helper(nestedList, depth) {
    console.log(depth);
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
            sum += helper(list.getList(), depth - 1);
        }
    });
    return sum;
}