/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    // if node itself is null, or this is the last node, return
    if (node.val === null || node.next === null) {
        return;
    }
    
    // 2 -> 3 -> 4 TO 2 -> 4
    // because you won't know 2, you only can get access to 3, so change 3 to 4!!!
    // change the current node to its next node: val and next
    node.val = node.next.val;
    node.next = node.next.next;
};