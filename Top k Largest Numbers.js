Top k Largest Numbers

Given an integer array, find the top k largest numbers in it.

Have you met this question in a real interview? Yes
Example
Given [3,10,1000,-99,4,100] and k = 3.
Return [1000, 100, 10].

Tags 
Heap Priority Queue

class Solution {
    /*
     * @param nums an integer array
     * @param k an integer
     * @return the top k largest numbers in array
     */
    public int[] topk(int[] nums, int k) {
        // Write your code here

        PriorityQueue<Integer> q = new PriorityQueue<Integer>(k, new Comparator<Integer>() {
             public int compare(Integer o1, Integer o2) {
                 if(o1 < o2) {
                     return 1;
                 } else if(o1 > o2) {
                     return -1;
                 } else {
                     return 0;
                 }
             }
         });

        int[] results = new int[k];
        for (int num : nums) {
            q.add(num);
        }
        
        for (int i = 0; i < k; i++) {
            results[i] = q.poll();
        }
        return results;
    }
};


