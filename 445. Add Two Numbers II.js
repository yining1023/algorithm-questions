// 445. Add Two Numbers II

// You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Follow up:
// What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

// Example:

// Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 8 -> 0 -> 7

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 
// based on question 1, reverse l1 and l2, write q1 answer, reverse the linked list back
// but how to reverse linked list? ****

var addTwoNumbers = function(l1, l2) {
    l1 = reverseLinkedList(l1);
    l2 = reverseLinkedList(l2);
    
    return reverseLinkedList(addReversed2Lists(l1, l2));
};

function addReversed2Lists(l1, l2) {
    // remember when to exit!!! when l1 l2 === null
    // 5 cases!! l1, l2 exit, l1 exits, l2 exits, l1,l2 both not exit but carry !=== 0, l1,l2 both not exit but carry === 0
    if (l1 === null && l2 === null) {
        return null;
    }
    
    var head = new ListNode(0);
    var point = head,
        carry = 0;
    
    while (l1 !== null && l2 !== null) {
        var sum = l1.val + l2.val + carry;
        // use parseInt!!!!
        point.next = new ListNode(parseInt(sum % 10));
        // update carry
        carry = parseInt(sum / 10);
        // move to the next round
        point = point.next;
        l1 = l1.next;
        l2 = l2.next;
    }
    
    while (l1 !== null) {
        sum = l1.val + carry;
        point.next = new ListNode(parseInt(sum % 10));
        // update carry
        carry = parseInt(sum / 10);
        // move to the next round
        point = point.next;
        l1 = l1.next;
    }
    
    while (l2 !== null) {
        // it's l2 not l1
        sum = l2.val + carry;
        point.next = new ListNode(parseInt(sum % 10));
        // update carry
        carry = parseInt(sum / 10);
        // move to the next round
        point = point.next;
        l2 = l2.next;
    }
    
    if (carry !== 0) {
        point.next = new ListNode(parseInt(carry % 10));
    }
    
    return head.next;
}

// related to Q 206, reverse linked list!!
function reverseLinkedList(point) {
    var prev = null;
    while (point !== null) {
        var temp = point.next;
        point.next = prev;
        // move to the next position
        prev = point;
        point = temp;
    }
    // in the end, prev = the end, point = null
    return prev;
}