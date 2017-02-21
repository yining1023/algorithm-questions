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

这题的关键是如何track一个节点是否已经被copy了。假如我们要copy如下list，用指针p1来扫描每个节点，另一个指针p2建立copy。
______
|     |
|     V
1->2->3

p1扫描1时，p2复制1，以及1->next (2), 1->random (3)。之后p1, p2分别移到各自的2节点。
此时我们必须得知道节点3在之前已经被复制了，并且得知道复制节点的地址。
______
|       |
|       V
1->2    3 

所以这里可以使用一个hash table来记录!!原节点!!和!!复制节点!!的地址对应关系。
这样每次要建立当前节点p的next和random前，先在hash table中查找。
如果找到，则直接连接；否则建立新节点连上，并把和原节点的对应关系存入hash table中。
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
 
/*第一遍扫的时候巧妙运用next指针， 开始数组是1->2->3->4
// 然后扫描过程中 先建立copy节点 1->1`->2->2`->3->3`->4->4`, 
// 然后第二遍copy的时候去建立边的copy
// 拆分节点, 一边扫描一边拆成两个链表，这里用到两个dummy node。
// 第一个链表变回  1->2->3 , 然后第二变成 1`->2`->3`  */
// No HashMap version
var copyRandomList = function(head) {
    if (head === null) {
        return null;
    }
    
    copyNodes(head);
    copyRandom(head);
    return splitList(head);
    
}

function copyNodes(head) {
    while (head !== null) {
        // copy its label, next, random
        newNode = new RandomListNode(head.label);
        newNode.next = head.next;
        newNode.random = head.random;
        // insert
        head.next = newNode;
        // move one more step
        head = head.next.next;
    }
}

function copyRandom(head) {
    while (head !== null) {
        if (head.next.random !== null) {
            head.next.random = head.random.next;
        }
        head = head.next.next;
    }
    
}

function splitList(head) {
    let newHead = head.next;
    while(head !== null) {
        // 想让head.next跳一个，先要存下来head.next
        let temp = head.next;
        head.next = temp.next;
        // head move to next
        head = head.next;
        // temp is not the last node
        if (temp.next !== null) {
            temp.next = temp.next.next;
        }
    }
    return newHead;
}


// version 2: hashmap 
// because it has random pointer, in order to avoid to copy duplicates node,
// we need hashmap to save the relationship between the old and new nodes
// javascript cannot use an object as a key in the hash, so save head.label as key!!!!
var copyRandomList = function(head) {
    if (head === null) {
        return null;
    }
    
    let dummy = new RandomListNode(0);
    let pre = dummy, newNode;
    let hash = {};
    while (head !== null) {
        // when there is no key in the hash
        if (!hash[head.label] || hash[head.label] === undefined) {
            // deep copy the node
            // head.label, not head.val
            newNode = new RandomListNode(head.label);
            hash[head.label] = newNode;
        } else {
            newNode = hash[head.label];
        }
        
        // copy random pointer
        if (head.random !== null) {
            if (!hash[head.random.label] || hash[head.random.label] === undefined) {
                newNode.random = new RandomListNode(head.random.label);
                hash[head.random.label] = newNode.random;
            } else {
                // 如果已经new了这个node，不能重复new，只是把.random的关系连上
                newNode.random = hash[head.random.label];
            }
        }
        
        pre.next = newNode;
        // move to next
        pre = newNode;
        head = head.next;
    }
    
    return dummy.next;
}


// deep copy the entire linked list
// copy itself first, then worry about its random
// then use Hashmap to track the points that already gone through
// HashMap is like that key: [node.label], value: the whole node!
var copyRandomList = function(head) {
    var hashMap = {};
    var newHead = new RandomListNode(0);
    newHead.next = copyList(head);
    
    function copyList(node) {
        if (node === null) {
            return node;
        }
        
        // if already went through this one, return its node
        if (hashMap[node.label]) {
            return hashMap[node.label];
        }
        
        // copy the node itself
        var newNode = new RandomListNode(node.label);
        
        // save into hashmap
        hashMap[node.label] = newNode;
        
        // copy its next and random
        newNode.next = copyList(node.next);
        newNode.random = copyList(node.random);
        
        return newNode;
    }
    
    return newHead.next;
};
