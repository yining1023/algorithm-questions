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

// get the length of A and B
// make them has the same length
// compare each head, if === , return, if not, move to the next node
var getIntersectionNode = function(headA, headB) {
    var lengthA = getLength(headA),
        lengthB = getLength(headB);
        
    while (lengthA > lengthB) {
        headA = headA.next;
        lengthA--;
    }
    
    while (lengthB > lengthA) {
        headB = headB.next;
        lengthB--;
    }
    
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
