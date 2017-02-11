170. Two Sum III - Data structure design

Design and implement a TwoSum class. It should support the following operations: add and find.

add - Add the number to an internal data structure.
find - Find if there exists any pair of numbers which sum is equal to the value.

For example,
add(1); add(3); add(5);
find(4) -> true
find(7) -> false
Hide Company Tags LinkedIn
Hide Tags Hash Table Design
Hide Similar Problems (E) Two Sum (M) Unique Word Abbreviation

/**
 * Initialize your data structure here.
 */
// remeber to use this.!!!
// hash to keep track of the time it appears + list
var TwoSum = function() {
    this.list = [];
    this.map = {};
};

/**
 * Add the number to an internal data structure.. 
 * @param {number} number
 * @return {void}
 */
TwoSum.prototype.add = function(number) {
    if (this.map[number] !== undefined) {
        this.map[number]++;
    } else {
        this.list.push(number);
        this.map[number] = 1;
    }
};

/**
 * Find if there exists any pair of numbers which sum is equal to the value. 
 * @param {number} value
 * @return {boolean}
 */
TwoSum.prototype.find = function(value) {
    for (let i = 0; i < this.list.length; i++) {
        let num1 = this.list[i], num2 = value - num1;
        // 2 cases, num1===num2, num1 !== num2
        if ((num1 !== num2 && this.map[num2] !== undefined) || (num1 === num2 && this.map[num1] > 1)) {
            return true;
        }
    }
    return false;
};

/** 
 * Your TwoSum object will be instantiated and called as such:
 * var obj = Object.create(TwoSum).createNew()
 * obj.add(number)
 * var param_2 = obj.find(value)
 */
