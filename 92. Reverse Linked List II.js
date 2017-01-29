// 92. Reverse Linked List II   
// Add to List QuestionEditorial Solution  My Submissions
// Total Accepted: 96432
// Total Submissions: 322931
// Difficulty: Medium
// Contributors: Admin
// Reverse a linked list from position m to n. Do it in-place and in one-pass.

// For example:
// Given 1->2->3->4->5->NULL, m = 2 and n = 4,

// return 1->4->3->2->5->NULL.

// Note:
// Given m, n satisfy the following condition:
// 1 ≤ m ≤ n ≤ length of list.

// Hide Tags Linked List
// Hide Similar Problems (E) Reverse Linked List


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
    if (head === null || m < 1 || n < 1 || m >= n) {
        return head;
    }
    
    // dummy node
    var dummy = new ListNode(0);
    dummy.next = head;
    head = dummy;
    
    // move head to m - 1
    for (var i = 0; i < m - 1; i++) {
        head = head.next;
    }
    
    var prev = head.next;
    var cur = head.next.next;

    for (var j = 0; j < n - m; j++) {
        var temp = cur.next;
        cur.next = prev;
        prev = cur;
        cur = temp;
    }
    
    // handle head and tail in the bigger linked list
    // head to prev
    // head.next to cur
    head.next.next = cur;
    head.next = prev;

    return dummy.next;
};