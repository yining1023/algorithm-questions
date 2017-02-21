141. Linked List Cycle

Given a linked list, determine if it has a cycle in it.

Follow up:
Can you solve it without using extra space?

Hide Company Tags Amazon Microsoft Bloomberg Yahoo
Hide Tags Linked List Two Pointers
Hide Similar Problems (M) Linked List Cycle II

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
// hash map, keep track of what have we already visited, O(N) extra space
// two pointers, fast and slow
var hasCycle = function(head) {
    if (head === null || head.next === null) {
        return false;
    }
    let slow = head, fast = head.next;
    // while fast !== slow, continue, until fast === slow
    while (fast !== slow) {
        if (fast === null || fast.next === null) {
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }
    return true;
};

// var hasCycle = function(head) {
//     if(head === null || head.next === null){
//         return false;
//     }
//     let slow = head;
//     let fast = head.next;
//     while (fast !== slow) {
//         // first check fast.next === null, then move fast 2 steps
//         if (fast === null || fast.next === null) {
//             return false;
//         }
//         slow = slow.next;
//         fast = fast.next.next;
//     }
//     return true;
// }

// // two pointers!!!!
// var hasCycle = function(head) {
//     if(head === null || head.next === null){
//         return false;
//     }
    
//     var faster = head.next;
//     var slower = head;
    
//     while(faster && slower){
//         // 相遇
//         // if there is cycle, fast and slow will eventually meet
//         if(faster.val === slower.val){
//             return true;
//         }
        
//         // faster pointer goes 2 steps every time
//         faster = faster.next;
        
//         if(faster === null){
//             return false;
//         } else {
//             faster = faster.next;
//         }
        
//         // slower pointer goes 1 steps every time
//         slower = slower.next;
//     }
    
//     return false;
// };


// two pointers!!!!
var hasCycle = function(head) {
    if(head === null || head.next === null){
        return false;
    }
    
    var faster = head.next;
    var slower = head;
    
    while(faster && slower){
        // 相遇
        // if there is cycle, fast and slow will eventually meet
        if(faster.val === slower.val){
            return true;
        }
        
        // faster pointer goes 2 steps every time
        faster = faster.next;
        
        if(faster === null){
            return false;
        } else {
            faster = faster.next;
        }
        
        // slower pointer goes 1 steps every time
        slower = slower.next;
    }
    
    return false;
};
