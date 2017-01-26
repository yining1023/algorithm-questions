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

// 这题的关键是如何track一个节点是否已经被copy了。假如我们要copy如下list，用指针p1来扫描每个节点，另一个指针p2建立copy。
// ______
// |           |
// |          V
// 1->2->3

// p1扫描1时，p2复制1，以及1->next (2), 1->random (3)。之后p1, p2分别移到各自的2节点。
// 此时我们必须得知道节点3在之前已经被复制了，并且得知道复制节点的地址。
// ______
// |           |
// |          V
// 1->2    3 

// 所以这里可以使用一个hash table来记录原节点和复制节点的地址对应关系。这样每次要建立当前节点p的next和random前，先在hash table中查找。如果找到，则直接连接；否则建立新节点连上，并把和原节点的对应关系存入hash table中。
 
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

