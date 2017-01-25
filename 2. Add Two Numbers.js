// 2. Add Two Numbers

// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8

// Show Company Tags
// Show Tags
// Show Similar Problems

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
var addTwoNumbers = function(l1, l2) {
    if (l1 === null && l2 === null) {
        return null;
    }
    
    // new a new ListNode!!
    var head = new ListNode(0);
    var point = head;
    var carry = 0;

    // 4 cases!! l1, l2 exit, l1 exit, l2 exit, l1,l2 not exit but carry !=== 0
    while(l1 !== null && l2 !== null) {
        var sum = l1.val + l2.val + carry;
        
        // the answer starts from point.next
        point.next = new ListNode(parseInt(sum % 10));

        // how to save the linked list to the result?
        // having a head, a point = head, and go through point.next
        // update carry for the next round
        // use parseInt!!!!!
        carry = parseInt(sum / 10);
        // go to next
        point = point.next;
        l1 = l1.next;
        l2 = l2.next;
    }
    
    while (l1 !== null) {
        sum = l1.val + carry;
        point.next = new ListNode(parseInt(sum % 10));
        carry = parseInt(sum / 10);
        point = point.next;
        l1 = l1.next;
    }
    
    while (l2 !== null) {
        sum = l2.val + carry;
        point.next = new ListNode(parseInt(sum % 10));
        carry = parseInt(sum / 10);
        point = point.next;
        l2 = l2.next;
    }
    
    // use if not while!!! because after this code, it doesn't change carry, it will stuck!
    if (carry !== 0) {
        point.next = new ListNode(parseInt(carry % 10));
    }
    
    return head.next;

};
