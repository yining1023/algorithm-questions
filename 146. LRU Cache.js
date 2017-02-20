// 146. LRU Cache

// Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

// get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
// put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

// Follow up:
// Could you do both operations in O(1) time complexity?

// Example:

// LRUCache cache = new LRUCache( 2 /* capacity */ );

// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // returns 1
// cache.put(3, 3);    // evicts key 2
// cache.get(2);       // returns -1 (not found)
// cache.put(4, 4);    // evicts key 1
// cache.get(1);       // returns -1 (not found)
// cache.get(3);       // returns 3
// cache.get(4);       // returns 4
// Hide Company Tags Google Uber Facebook Twitter Zenefits Amazon Microsoft Snapchat Yahoo Bloomberg Palantir
// Hide Tags Design
// Hide Similar Problems (H) LFU Cache

/**
 * @param {number} capacity
 */
// hash map + linked list with prev and next!!
// dummy head and dummy tail, because double link, has head, and tail, might delete head, or tail, needs dummy
// having a function for move to the tail
// get: remove from the list, move to the tail
// set: if size === capacity, delete head in list and map, add new one, move to tail
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}
var LRUCache = function(capacity) {
    this.map = new Map();
    this.capacity = capacity;
    
    this.dummyHead = new Node(-1, -1);
    this.dummyTail = new Node(-1, -1);
    
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.prev = this.dummyHead;

    this.move_to_tail = function(current) {
        // sth is changed, cannot use it to get the reference
        current.prev = this.dummyTail.prev;
        this.dummyTail.prev = current;
        current.prev.next = current;
        current.next = this.dummyTail;
    };
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (this.map.get(key) === undefined || !this.map.get(key)) {
        return -1;
    }
    
    // remove it from the list
    let current = this.map.get(key);
    current.prev.next = current.next;
    current.next.prev = current.prev;
    
    // move to the tail
    this.move_to_tail(current);

    return this.map.get(key).value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    // 保证是存在在cache里面！！！！
    if (this.get(key) !== -1) {
        this.map.get(key).value = value;
        return;
    }
    
    if (this.map.size === this.capacity) {
        // delete the key
        // OMG OMG OMG F*CK
        // not delete key!!!! delete the previous head.key!!!!!!!!!!!!!!!!!!!!!!
        this.map.delete(this.dummyHead.next.key);

        // delete the head
        this.dummyHead.next = this.dummyHead.next.next;
        this.dummyHead.next.prev = this.dummyHead;
    }
    
    let insert = new Node(key, value);
    this.map.set(key, insert);
    this.move_to_tail(insert);
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = Object.create(LRUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
