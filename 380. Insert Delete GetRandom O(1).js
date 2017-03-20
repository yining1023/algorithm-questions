380. Insert Delete GetRandom O(1)
Design a data structure that supports all following operations in average O(1) time.

insert(val): Inserts an item val to the set if not already present.
remove(val): Removes an item val from the set if present.
getRandom: Returns a random element from current set of elements. Each element must have the same probability of being returned.
Example:

// Init an empty set.
RandomizedSet randomSet = new RandomizedSet();

// Inserts 1 to the set. Returns true as 1 was inserted successfully.
randomSet.insert(1);

// Returns false as 2 does not exist in the set.
randomSet.remove(2);

// Inserts 2 to the set, returns true. Set now contains [1,2].
randomSet.insert(2);

// getRandom should return either 1 or 2 randomly.
randomSet.getRandom();

// Removes 1 from the set, returns true. Set now contains [2].
randomSet.remove(1);

// 2 was already in the set, so return false.
randomSet.insert(2);

// Since 2 is the only number in the set, getRandom always return 2.
randomSet.getRandom();
Hide Company Tags Google Uber Twitter Amazon Yelp Pocket Gems Facebook
Hide Tags Array Hash Table Design
Hide Similar Problems (H) Insert Delete GetRandom O(1) - Duplicates allowed

/**
 * Initialize your data structure here.
 */
// a follow-up of this question.
// How do you modify your code to allow duplicated number? map[value, set]

// insert, check if it has it already, can use hashmap; when remove, just delete the key
// but how about getRandom? map.forEach to get all keys, no. use map to save [value, nums.length], use an array to save all the numbers
// when delete, check if it's the last number, if no, save the last number to this position, remove last number in the nums array
// in js, Math.floor(Math.random() * nums.length) get a random index in nums array

// the most important thing is that use map to save [value, nums.length] current index in the nums!
var RandomizedSet = function() {
    this.map = new Map();
    this.nums = [];
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function(val) {
    if (this.map.has(val)) return false;
    this.map.set(val, this.nums.length);// the currrent index
    this.nums.push(val);
    return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function(val) {
    if (!this.map.has(val)) return false;
    let curLoc = this.map.get(val);
    if (curLoc !== this.nums.length - 1) {// not the last number
        let lastOne = this.nums[this.nums.length - 1];
        this.nums[curLoc] = lastOne;// save the last number in the current pos, overwrites the current pos
        // update map too
        this.map.set(lastOne, curLoc);
    }
    this.nums.pop();
    this.map.delete(val);
    return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function() {
    let randomIndex = Math.floor(Math.random() * this.nums.length);
    return this.nums[randomIndex];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = Object.create(RandomizedSet).createNew()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
