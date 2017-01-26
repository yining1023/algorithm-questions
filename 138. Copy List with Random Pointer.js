// 138. Copy List with Random Pointer

// A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.

// Return a deep copy of the list.

// Hide Company Tags Amazon Microsoft Bloomberg Uber
// Hide Tags Hash Table Linked List
// Hide Similar Problems (M) Clone Graph

/**
 * Definition for singly-linked list with a random pointer.
 * function RandomListNode(label) {
 *     this.label = label;
 *     this.next = this.random = null;
 * }
 */

/**
 * @param {RandomListNode} head
 * @return {RandomListNode}
 */
 
// deep copy the entire linked list
// copy itself first, then worry about its random
// then use Hashmap to track the points that already gone through
var copyRandomList = function(head) {
    var hashMap = {};
    var newHead = new RandomListNode(0);
    newHead.next = copyList(head);
    
    function copyList(node) {
        if (node === null) {
            return node;
        }
        
        if (hashMap[node.label]) {
            return hashMap[node.label];
        }
        
        var newNode = new RandomListNode(node.label);
        hashMap[node.label] = newNode;
        
        newNode.next = copyList(node.next);
        newNode.random = copyList(node.random);
        
        return newNode;
    }
    
    return newHead.next;
};

