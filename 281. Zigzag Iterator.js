281. Zigzag Iterator

Given two 1d vectors, implement an iterator to return their elements alternately.

For example, given two 1d vectors:

v1 = [1, 2]
v2 = [3, 4, 5, 6]
By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1, 3, 2, 4, 5, 6].

Follow up: What if you are given k 1d vectors? How well can your code be extended to such cases?

Clarification for the follow up question - Update (2015-09-18):
The "Zigzag" order is not clearly defined and is ambiguous for k > 2 cases. If "Zigzag" does not look right to you, replace "Zigzag" with "Cyclic". For example, given the following input:

[1,2,3]
[4,5,6,7]
[8,9]
It should return [1,4,8,2,5,9,3,6,7].
Hide Company Tags Google
Hide Tags Design
Hide Similar Problems (M) Binary Search Tree Iterator (M) Flatten 2D Vector (M) Peeking Iterator (M) Flatten Nested List Iterator

// two pointers, 谁小先打印谁，然后++
// 我最先想到的方法是用两个变量i和j分别记录两个向量的当前元素位置，初始化为0，
// 然后当i<=j时，则说明需要打印v1数组的元素，反之则打印v2数组中的元素。
// 在hasNext函数中，当i或j打印等于对应数组的长度时，我们将其赋为一个特大值，这样不影响我们打印另一个数组的值
// 只有当i和j都超过格子数组的长度时，返回false
/**
 * @constructor
 * @param {Integer[]} v1
 * @param {Integer[]} v1
 */
var ZigzagIterator = function ZigzagIterator(v1, v2) {
    this.v = [];
    this.v.push(v1);
    this.v.push(v2);
    this.i = 0;
    this.j = 0;
};


/**
 * @this ZigzagIterator
 * @returns {boolean}
 */
ZigzagIterator.prototype.hasNext = function hasNext() {
    if (this.i >= this.v[0].length) this.i = Infinity;
    if (this.j >= this.v[1].length) this.j = Infinity;
    return this.i < this.v[0].length || this.j < this.v[1].length;
};

/**
 * @this ZigzagIterator
 * @returns {integer}
 */
ZigzagIterator.prototype.next = function next() {
    return this.i <= this.j ? this.v[0][this.i++] : this.v[1][this.j++];
};

/**
 * Your ZigzagIterator will be called like this:
 * var i = new ZigzagIterator(v1, v2), a = [];
 * while (i.hasNext()) a.push(i.next());
*/