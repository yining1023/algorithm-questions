142. Linked List Cycle II

Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

Note: Do not modify the linked list.

Follow up:
Can you solve it without using extra space?

Hide Tags Linked List Two Pointers
Hide Similar Problems (E) Linked List Cycle (M) Find the Duplicate Number

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
// find the meeting point, slow, head, go one step at a time, meet at the cycle begin pointer
var detectCycle = function(head) {
    if (head === null || head.next === null) {
        return null;
    }
    let slow = head, fast = head.next;

    while (fast !== slow) {
        if (fast === null || fast.next === null) {
            return null;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    
    while (head !== slow) {
        slow = slow.next;
        head = head.next;
    }
    return head;
};
