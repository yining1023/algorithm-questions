381. Insert Delete GetRandom O(1) - Duplicates allowed

Design a data structure that supports all following operations in average O(1) time.

Note: Duplicate elements are allowed.
insert(val): Inserts an item val to the collection.
remove(val): Removes an item val from the collection if present.
getRandom: Returns a random element from current collection of elements. The probability of each element being returned is linearly related to the number of same value the collection contains.
Example:

// Init an empty collection.
RandomizedCollection collection = new RandomizedCollection();

// Inserts 1 to the collection. Returns true as the collection did not contain 1.
collection.insert(1);

// Inserts another 1 to the collection. Returns false as the collection contained 1. Collection now contains [1,1].
collection.insert(1);

// Inserts 2 to the collection, returns true. Collection now contains [1,1,2].
collection.insert(2);

// getRandom should return 1 with the probability 2/3, and returns 2 with the probability 1/3.
collection.getRandom();

// Removes 1 from the collection, returns true. Collection now contains [1,2].
collection.remove(1);

// getRandom should return 1 and 2 both equally likely.
collection.getRandom();
Hide Company Tags Yelp
Hide Tags Array Hash Table Design
Hide Similar Problems (M) Insert Delete GetRandom O(1)

// The follow-up: allowing duplications.
// For example, after insert(1), insert(1), insert(2), getRandom() should have 2/3 chance return 1 and 1/3 chance return 2.
// Then, remove(1), 1 and 2 should have an equal chance of being selected by getRandom().

// The idea is to add a set to the hashMap to remember all the locations of a duplicated number.

/**
 * Initialize your data structure here.
 */
var RandomizedCollection = function() {
    this.nums = [];
    this.map = new Map();
};

/**
 * Inserts a value to the collection. Returns true if the collection did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.insert = function(val) {
    let contains = this.map.has(val);
    if (!contains) this.map.set(val, new Set());
    this.map.get(val).add(this.nums.length);
    // need to add to the nums too
    this.nums.push(val);
    // Inserts another 1 to the collection. Returns false as the collection contained 1. Collection now contains [1,1].
    return !contains;
};

/**
 * Removes a value from the collection. Returns true if the collection contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedCollection.prototype.remove = function(val) {
    if (!this.map.has(val)) return false;

    let set = [...this.map.get(val)];// use spread operation to get an array of all the keys in the set
    let curLoc = set[set.length - 1];//curLoc is the last key(index) in the set of the key 'val' in the map

    this.map.get(val).delete(curLoc);// delete the key in set for val as key in map

    if (curLoc < this.nums.length - 1) {// if val is not the last one in the nums array
        let lastOne = this.nums[this.nums.length - 1];// get the last number
        this.nums[curLoc] = lastOne;
        //put the last number to the curloction in the nums array,lastOne is the real number,not the index

        // update the set for the lastOne too
        this.map.get(lastOne).delete(this.nums.length - 1);//in map,delete lastOne key's value, set's key which is nums.length-1
        this.map.get(lastOne).add(curLoc);//add the curLoc to the set, indicate it's new pos
    }
    this.nums.pop();// delete the last number in the nums array

    if (this.map.get(val).size === 0) this.map.delete(val);// if the set is empty now, delete the value

    return true;
};

/**
 * Get a random element from the collection.
 * @return {number}
 */
RandomizedCollection.prototype.getRandom = function() {
    let randomIndex = Math.floor(Math.random() * this.nums.length);
    return this.nums[randomIndex];
};

/**
 * Your RandomizedCollection object will be instantiated and called as such:
 * var obj = Object.create(RandomizedCollection).createNew()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
