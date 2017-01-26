// 155. Min Stack
// Total Accepted: 109396
// Total Submissions: 413026
// Difficulty: Easy
// Contributors: Admin
// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

// push(x) -- Push element x onto stack.
// pop() -- Removes the element on top of the stack.
// top() -- Get the top element.
// getMin() -- Retrieve the minimum element in the stack.
// Example:
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin();   --> Returns -3.
// minStack.pop();
// minStack.top();      --> Returns 0.
// minStack.getMin();   --> Returns -2.

/**
 * initialize your data structure here.
 */
// two arraies!!! has this min [] to track all the min, be useful in the pop() method
var MinStack = function() {
    this.min = [];
    this.stack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    var min = this.getMin();
    // this.stack.push, not this.push!!!
    this.stack.push(x);
    // when x = min, should push x in too
    // ex: push 0,1,0; pop(); getMin();
    //   stack:[0, 1, 0]
    //     min:[0, 0]
    //     pop()
    //   stack:[0, 1]
    //     min:[0] to make sure there is still one 0 in it
    if (x <= min || min === undefined) {
        this.min.push(x);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    var min = this.getMin();
    // this.stack.pop!!! not this.pop
    var p = this.stack.pop();
    if (p === min) {
        this.min.pop();
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    // not pop(), just get thie element
    return this.min[this.min.length - 1];
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = Object.create(MinStack).createNew()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */