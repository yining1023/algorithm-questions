Clarify questions:
面试题经常有意无意字面上很含糊，这个时候一定需要和面世官交流搞清楚确切的意思。总结一下每个topic需要澄清的地方：

1. Array:
(1) Sorted or not?
(2) How many elements?
(3) Element type? Int, float, double?
(4) What's the range of those numbers? Positive or negative?
(5) Contain duplicates or not?
(6) Subsequence: adjacent or not?

2. Binary tree:
(1) Binary search tree or normal binary tree?
(2) Balanced or not?
(3) Complete or not?
(4) Has parent pointer or not?

3. Linked list:
(1) Singly or doubly linked list?
(2) Has duplicated nodal value or not?

4. String:
(1) Need to remove white spaces? Tab and newline?
(2) Only has digits? English letters? Upper or lower case?

5. Graph:
(1) How many nodes and edges?
(2) Directed or undirected?
(3) Edges have weights? If so, what's the range?
(4) Has loops? Negative sum loops?

6. Return value:
(1) What should my method return?
(2) If there are multiple solutions to the problem, which one should be returned?
(3) If it should return multiple values, do you have any preference on what to return?
(4) What should I do/return if the input is invalid / does not match the constraints?


基础data structure/algorithm列表
1. Implementation of stack/queue (array and linked list)
Implement queue using array: circular array - when meet end, wrap around to the beginning.
An array with size n can implement an queue with size n-1 (related to the queue full condition)
Queue empty: head == tail
Queue full: head == tail+1 or head == tail wrap around
Enqueue: tail++ or wrap around
Dequeue: head++ or wrap around

2. Binary search tree: insertion, deletion, successor, traversal, balance.
(1) Insertion: always insert to leaf; need to find the parent of the insertion position, O(h).
(2) Deletion: assume delete z.
z has not child: just delete.
z has only one child: replace z by its child.
z has both left/right child: find leftmost node in z's right subtree y. If y==z.right, replace z by y. Otherwise replace y by y's right child, and then replace z by y.
http://geeksquiz.com/binary-search-tree-set-2-delete/
(3) Successor: http://www.geeksforgeeks.org/inorder-successor-in-binary-search-tree/
(4) Preorder, in-order, and post-order traversal using iterative methods.

3. Heap: creation, insertion.
(1) Concept: nearly complete binary tree, implemented using array
Parent-child relation: for 0-based array (A[0:n-1])
parent(i) = (i-1)/2
left(i) = 2*i+1
right(i) = 2*i+2
(2) Properties:
Max heap: A[parent(i)] >= A[i] - heap sort
Min heap: A[parent(i)] <= A[i] -  priority queue
(3) Heapify: find the largest among y = {A[i], A[left(i)], A[ right(i)]}.
If y = A[i], done; else, swap A[i] with y, and heapify y
(4) Build max heap: for each i from heap.size/2  to 0, heapify(i).

4. Hash table: array + linked list implementation, collision

5. Sorting: (1) merge sort, (2) quick sort, (3) counting sort
Merge sort:
http://en.wikibooks.org/wiki/Algorithm_Implementation/Sorting/Merge_sort
http://www.sanfoundry.com/cpp-program-implement-merge-sort/
Quick sort:
http://en.wikibooks.org/wiki/Algorithm_Implementation/Sorting/Quicksort
https://gsamaras.wordpress.com/code/quicksort-c/

6. Master theorem
Key: compare logb(a) and c: http://en.wikipedia.org/wiki/Master_theorem

1. Stack implementation using array in C++:


 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
#include <string>
using namespace std;
 
class Stack {
private:
      int top;
      int capacity;
      int *storage;
public:
      Stack(int capacity) {
            if (capacity <= 0)
                  throw string("Stack's capacity must be positive");
            storage = new int[capacity];
            this->capacity = capacity;
            top = -1;
      }
 
      void push(int value) {
            if (top == capacity)
                  throw string("Stack's underlying storage is overflow");
            top++;
            storage[top] = value;
      }
 
      int peek() {
            if (top == -1)
                  throw string("Stack is empty");
            return storage[top];
      }
 
      void pop() {
            if (top == -1)
                  throw string("Stack is empty");
            top--;
      }
 
      bool isEmpty() {
            return (top == -1);
      }
 
      ~Stack() {
            delete[] storage;
      }
};

2. Min Binary Heap Implementation in C++:

http://www.codeproject.com/Tips/816934/Min-Binary-Heap-Implementation-in-Cplusplus