K Closest Points

Given some points and a point origin in two dimensional space, find k points out of the some points which are nearest to origin.
Return these points sorted by distance, if they are same with distance, sorted by x-axis, otherwise sorted by y-axis.

Have you met this question in a real interview? Yes
Example
Given points = [[4,6],[4,7],[4,4],[2,5],[1,1]], origin = [0, 0], k = 3
return [[1,1],[2,5],[4,4]]

Tags 
LinkedIn Heap Amazon


// priority queue!!!
// poll the first element in the queue, the largest element in the min heap

/**
 * Definition for a point.
 * class Point {
 *     int x;
 *     int y;
 *     Point() { x = 0; y = 0; }
 *     Point(int a, int b) { x = a; y = b; }
 * }
 */
public class Solution {
    /**
     * @param points a list of points
     * @param origin a point
     * @param k an integer
     * @return the k closest points
     */
    private Point global_origin = null;
    public Point[] kClosest(Point[] points, Point origin, int k) {
        // Write your code here
        global_origin = origin;
        PriorityQueue<Point> pq = new PriorityQueue<Point> (k, new Comparator<Point> () {
            @Override
            // overwrite pq's compare function
            // distance, x, y
            public int compare(Point a, Point b) {
                int diff = getDistance(b, global_origin) - getDistance(a, global_origin);
                if (diff == 0)
                    diff = b.x - a.x;
                if (diff == 0)
                    diff = b.y - a.y;
                return diff;
            }
        });
        // add points into pq
        // maintaining a k size max heap
        // max heap doesn't mean hold the largest elements in the whole array
        // add one element one by one, if size not enough
        // poll the max one out, get the new one in
        for (int i = 0; i < points.length; i++) {
            pq.offer(points[i]);
            if (pq.size() > k)
            // size > k, poll the first element which is the largest!!!!
            // because the compare function is overwritten
            // Retrieves and removes the head of this queue, or returns null if this queue is empty.
              pq.poll();
        }
        
        k = pq.size();
        Point[] ret = new Point[k];  
        while (!pq.isEmpty())
        // from tail to head, write in.
            ret[--k] = pq.poll();
        return ret;
    }
    
    private int getDistance(Point a, Point b) {
        // delta(x)^2 + delta(y)^2
        return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
    }
}

