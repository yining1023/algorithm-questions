346. Moving Average from Data Stream

Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

For example,
MovingAverage m = new MovingAverage(3);
m.next(1) = 1
m.next(10) = (1 + 10) / 2
m.next(3) = (1 + 10 + 3) / 3
m.next(5) = (10 + 3 + 5) / 3
Hide Company Tags Google
Hide Tags Design Queue

// 这道题定义了一个MovingAverage类，里面可以存固定个数字，
// 然后我们每次读入一个数字，如果加上这个数字后总个数大于限制的个数，那么我们移除最早进入的数字，
// 然后返回更新后的平均数，
// 这种先进先出的特性最适合使用队列queue来做，
// 而且我们还需要一个double型的变量sum来记录当前所有数字之和，
// 这样有新数字进入后，如果没有超出限制个数，则sum加上这个数字，如果超出了，
// 那么sum先减去最早的数字，再加上这个数字，然后返回sum除以queue的个数即可：
/**
 * Initialize your data structure here.
 * @param {number} size
 */
var MovingAverage = function(size) {
    this.size = size;
    this.sum = 0;
    this.queue = [];
};

/** 
 * @param {number} val
 * @return {number}
 */
MovingAverage.prototype.next = function(val) {
    if (this.queue.length === this.size) {
        let first = this.queue.shift();
        this.sum -= first;
    }
    this.queue.push(val);
    this.sum += val;
    return this.sum / this.queue.length;
};

/** 
 * Your MovingAverage object will be instantiated and called as such:
 * var obj = Object.create(MovingAverage).createNew(size)
 * var param_1 = obj.next(val)
 */


/* Mock Interview */

class Average {
  constructor(size) {
    this.size = size;
    this.queue = [];
    this.sum = 0;
  }
}

Average.prototype.add = function(newNum) {
  if (this.size <= 0 || !newNum) {
    return null;
  }

  if (this.queue.length === this.size) {
    this.sum -= this.queue.shift();
  }

  this.queue.push(newNum);
  this.sum += newNum;
  // for (let i = 0; i < this.queue.length; i++) {
  //   sum += this.queue[i];
  // }
  return this.sum / this.queue.length;
}

// test
let test = new Average(3);
test.add(1);
test.add(2);
test.add(3);
test.add(4);
 