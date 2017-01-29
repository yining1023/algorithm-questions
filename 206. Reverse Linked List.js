// 206. Reverse Linked List

// Reverse a singly linked list.

// click to show more hints.

// Hint:
// A linked list can be reversed either iteratively or recursively. Could you implement both?

// Hide Company Tags Uber Facebook Twitter Zenefits Amazon Microsoft Snapchat Apple Yahoo Bloomberg Yelp Adobe
// Hide Tags Linked List
// Hide Similar Problems (M) Reverse Linked List II (M) Binary Tree Upside Down (E) Palindrome Linked List

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// <3 <3 one time submition
var reverseList = function(head) {
    if (head === null) {
        return null;
    }
    
    var prev = null;
    var node = head;
    
    while (node !== null) {
        var temp = node.next;
        node.next = prev;
        
        prev = node;
        node = temp;
    }
    
    return prev;
};

// no need to have node actually
var reverseList = function(head) {
    if (head === null) {
        return null;
    }
    
    var prev = null;
    
    while (head !== null) {
        var temp = head.next;
        head.next = prev;
        
        prev = head;
        head = temp;
    }
    
    return prev;
};
