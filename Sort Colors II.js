Sort Colors II
Given an array of n objects with k different colors (numbered from 1 to k), sort them so that objects of the same color are adjacent, with the colors in the order 1, 2, ... k.

 Notice

You are not suppose to use the library's sort function for this problem.

Have you met this question in a real interview? Yes
Example
Given colors=[3, 2, 2, 1, 4], k=4, your code should sort colors in-place to [1, 2, 2, 3, 4].

Challenge 
A rather straight forward solution is a two-pass algorithm using counting sort. That will cost O(k) extra memory. Can you do it without using extra memory?

Tags 
Two Pointers Sort

// version 1: O(nlogk), the best
class Solution {
    /**
     * @param colors: A list of integer
     * @param k: An integer
     * @return: nothing
     */
    public void sortColors2(int[] colors, int k) {
        if (colors == null || colors.length == 0) {
            return;
        }
        rainbowSort(colors, 0, colors.length - 1, 1, k);
    }

    public void rainbowSort(int[] colors,
                            int left,
                            int right,
                            int colorFrom,
                            int colorTo) {
        if (colorFrom == colorTo) {
            return;
        }
        if (left >= right) {
            return;
        }
        int l = left, r = right;
        int midColor = (colorFrom + colorTo) / 2;
        // 2 pointers!! not 2.5 pointers!!
        while (l <= r) {
            // while not if!! while it <=, ++ until not!!
            while (l <= r && colors[l] <= midColor) {
                l++;
            }
            while (l <= r && colors[r] > midColor) {
                r--;
            }
            if (l <= r) {
                int temp = colors[l];
                colors[l] = colors[r];
                colors[r] = temp;
                l++;
                r--;
            }
        }

        // in the end, r < l, so left - r; l - right
        // the second pert would start from midColor + 1
        rainbowSort(colors, left, r, colorFrom, midColor);
        rainbowSort(colors, l, right, midColor + 1, colorTo);
    }
}
