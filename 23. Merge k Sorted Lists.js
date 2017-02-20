23. Merge k Sorted Lists

Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

Hide Company Tags LinkedIn Google Uber Airbnb Facebook Twitter Amazon Microsoft
Hide Tags Divide and Conquer Linked List Heap
Hide Similar Problems (E) Merge Two Sorted Lists (M) Ugly Number II

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
// O(NlogK)
// 1. divide and conquer, based on merge two lists
// 2. heap, priority queue
// 3. merge each pairs
var mergeKLists = function(lists) {
    if (lists === null || lists.length === 0) {
        return null;
    }
    return helper(lists, 0, lists.length - 1);
};

function helper(lists, start, end) {
    // if it's a single list
    if (start === end) {
        return lists[start];
    }
    // use parseInt!!
    let mid = parseInt(start + (end - start) / 2);
    let left = helper(lists, start, mid);
    let right = helper(lists, mid + 1, end); // mid + 1

    return mergeTwoLists(left, right);
}

function mergeTwoLists(list1, list2) {
    // dummy node
    let dummy = new ListNode(0);
    let tail = dummy;
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            tail.next = list1;
            list1 = list1.next; // move list1
        } else {
            tail.next = list2;
            list2 = list2.next;
        }
        tail = tail.next; // move tail
    }
    
    if (list1 !== null) {
        tail.next = list1;
    }
    
    if (list2 !== null) {
        tail.next = list2;
    }
    return dummy.next;
}

version 2: Heap
public class Solution {
    private Comparator<ListNode> ListNodeComparator = new Comparator<ListNode>() {
        public int compare(ListNode left, ListNode right) {
            return left.val - right.val;
        }
    };
    
    public ListNode mergeKLists(List<ListNode> lists) {
        if (lists == null || lists.size() == 0) {
            return null;
        }
        
        Queue<ListNode> heap = new PriorityQueue<ListNode>(lists.size(), ListNodeComparator);
        // 把lists中的头都放入min heap
        for (int i = 0; i < lists.size(); i++) {
            if (lists.get(i) != null) {
                heap.add(lists.get(i));
            }
        }
        
        // new 一个新的链表
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        
        // 把heap中的数一个一个poll出来，每poll一个，把它的下一个放进来！
        while (!heap.isEmpty()) {
            ListNode head = heap.poll();
            tail.next = head;
            tail = head;
            if (head.next != null) {
                heap.add(head.next);
            }
        }
        return dummy.next;
    }
}

// Version 3: merge two by two
/**
 * Definition for ListNode.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int val) {
 *         this.val = val;
 *         this.next = null;
 *     }
 * }
 */ 
// 两两合并
public class Solution {
    /**
     * @param lists: a list of ListNode
     * @return: The head of one sorted list.
     */
    public ListNode mergeKLists(List<ListNode> lists) {  
        if (lists == null || lists.size() == 0) {
            return null;
        }
        
        while (lists.size() > 1) {
            List<ListNode> new_lists = new ArrayList<ListNode>();
            for (int i = 0; i + 1 < lists.size(); i += 2) {
                ListNode merged_list = merge(lists.get(i), lists.get(i+1));
                new_lists.add(merged_list);
            }
            // 两两合并之后 要是剩一个的话 加上
            if (lists.size() % 2 == 1) {
                new_lists.add(lists.get(lists.size() - 1));
            }
            // lists = newlists 继续合并
            lists = new_lists;
        }
        
        return lists.get(0);
    }
    
    // merge two lists!
    private ListNode merge(ListNode a, ListNode b) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (a != null && b != null) {
            if (a.val < b.val) {
                tail.next = a;
                a = a.next;
            } else {
                tail.next = b;
                b = b.next;
            }
            tail = tail.next;
        }
        
        if (a != null) {
            tail.next = a;
        } else {
            tail.next = b;
        }
        
        return dummy.next;
    }
}
