// // 160. Intersection of Two Linked Lists
// Write a program to find the node at which the intersection of two singly linked lists begins.


// For example, the following two linked lists:

// A:          a1 → a2
//                    ↘
//                      c1 → c2 → c3
//                    ↗            
// B:     b1 → b2 → b3
// begin to intersect at node c1.


// Notes:

// If the two linked lists have no intersection at all, return null.
// The linked lists must retain their original structure after the function returns.
// You may assume there are no cycles anywhere in the entire linked structure.
// Your code should preferably run in O(n) time and use only O(1) memory.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// get tailA, tailA.next = headB
// hasCycle2, return cycle begin pointer
// tailA.next = null, return result
public class Solution {
    /**
     * @param headA: the first list
     * @param headB: the second list
     * @return: a ListNode 
     */
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        if (headA == null || headB == null) {
            return null;
        }
        
        // get the tail of list A.
        ListNode node = headA;
        while (node.next != null) {
            node = node.next;
        }
        node.next = headB;
        ListNode result = listCycleII(headA);
        node.next = null;
        return result;
    }
    
    private ListNode listCycleII(ListNode head) {
        ListNode slow = head, fast = head.next;
        
        while (slow != fast) {
            if (fast == null || fast.next == null) {
                return null;
            }
            
            slow = slow.next;
            fast = fast.next.next;
        }
        
        slow = head;
        fast = fast.next;
        while (slow != fast) {
            slow = slow.next;
            fast = fast.next;
        }
        
        return slow;
    }
}

// get the length of A and B
// make them has the same length
// compare each head, if === , return, if not, move to the next node
var getIntersectionNode = function(headA, headB) {
    var lengthA = getLength(headA),
        lengthB = getLength(headB);
    // find a way to align A,B   
    while (lengthA > lengthB) {
        headA = headA.next;
        lengthA--;
    }
    
    while (lengthB > lengthA) {
        headB = headB.next;
        lengthB--;
    }
    
    // When A,B has the same rest length
    while (headA && headB) {
        if (headA === headB) {
            return headA;
        } else {
            headA = headA.next;
            headB = headB.next;
        }
    }
    return null;
};

function getLength(head) {
    var leng = 0;
    while (head) {
        leng++;
        head = head.next;
    }
    return leng;
}
