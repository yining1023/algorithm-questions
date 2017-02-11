148. Sort List

Sort a linked list in O(n log n) time using constant space complexity.

Hide Tags Linked List Sort
Hide Similar Problems (E) Merge Two Sorted Lists (M) Sort Colors (M) Insertion Sort List

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
// quick sort: O(n log n), O(1)
// merge sort: O(n log n), O(n)

// merge sort
// find middle
// divide and conquer, right, left
// merge谁小谁出列，谁还没有走完就连上，dummy node
var sortList = function(head) {
    if (head === null || head.next === null) {
        return head;
    }
    
    let middle = findMiddle(head);
    // divide and conquer
    let right = sortList(middle.next);
    // 一定要断开！
    middle.next = null;
    let left = sortList(head);
    
    return merge(left, right);
};

function findMiddle(head) {
    let slow = head,
    fast = head.next;
    
    // && not ||
    while(fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

function merge(head1, head2) {
    let dummy = new ListNode(0);
    let tail = dummy;

    while (head1 !== null && head2 !== null) {
        if (head1.val < head2.val) {
            tail.next = head1;
            head1 = head1.next;
        } else {
            tail.next = head2;
            head2 = head2.next;
        }
        tail = tail.next;
    }

    if (head1 !== null) {
        tail.next = head1;
    } else {
        tail.next = head2;
    }
    
    return dummy.next;
}

// quick sort, partition
// find median
// 3 lines, left, middle, right, 断开
// divide and conquer, left, right
// concate(left, middle, right) 其中需要getTails()
var sortList = function(head) {
    if (head === null || head.next === null) {
        return head;
    }
    // 1. find median O(n)
    let mid = findMedian(head);
    
    // 2. form 3 lines, left, middle, right
    let dummyL = new ListNode(0), tailL = dummyL,
        dummyM = new ListNode(0), tailM = dummyM,
        dummyR = new ListNode(0), tailR = dummyR;

    while (head !== null) {
        if (head.val < mid.val) {
            tailL.next = head;
            tailL = head;
        } else if (head.val > mid.val) {
            tailR.next = head;
            tailR = head;
        } else {
            tailM.next = head;
            tailM = head;
        }
        head = head.next;
    }
    
    // cut off
    tailL.next = null;
    tailR.next = null;
    tailM.next = null;
    
    // traverse, continue to sort left and right
    // divide and conquer
    let left = sortList(dummyL.next);
    let right = sortList(dummyR.next);
    
    // 3. merge 3 lines
    // remember to return
    return concat(left, dummyM.next, right);
};

function findMedian(head) {
    if (head === null || head.next === null) {
        return head;
    }
    let slow = head,
        fast = head.next;
    // while fast, not head, not moving head, moving fast and slow
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}

// sometimes left might be null, so the structure of the linked list might change, need dummy node
function concat(left, middle, right) {
    let dummy = new ListNode(0);
    let tail = dummy;

    tail.next = left, tail = getTail(tail);
    tail.next = middle, tail = getTail(tail);
    // set the tail to the end of the list
    tail.next = right, tail = getTail(tail);

    return dummy.next;
}

// O(N)
function getTail(head) {
    if (head === null) {
        return null;
    }
    // javascript weird thing, needs to check if it's undefined or not
    while (head.next !== null && head.next !== undefined) {
        head = head.next;
    }
    
    return head;
}
