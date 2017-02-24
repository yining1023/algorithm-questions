// 42. Trapping Rain Water

// Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

// For example, 
// Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.


// The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!

// Hide Company Tags Google Twitter Zenefits Amazon Apple Bloomberg
// Hide Tags Array Stack Two Pointers
// Hide Similar Problems (M) Container With Most Water (M) Product of Array Except Self (H) Trapping Rain Water II

/**
 * @param {number[]} height
 * @return {number}
 */
// two pointers!!!
// 从两边向中间灌水
var trap = function(height) {
    if (height === null || height.length === 0) {
        return 0;
    }

    var left = 0,
        right = height.length - 1,
        // starting point for left and right should be the real edges
        // ex: [2,0,2]
        leftEdge = height[left],
        rightEdge = height[height.length - 1],
        result = 0;
        
    while (left < right) {
        // need to compare leftEdge and rightEdge too!!!
        if (leftEdge <= rightEdge) {
            // why do you need to left++ first?
            // after comparing two edges, go to the middle for one step,
            // otherwise lose one round.
            left ++;
            
            if (height[left] >= leftEdge) {
                leftEdge = height[left];
            } else {
                result += (leftEdge - height[left]);
            }

        } else {
            right --;
            
            if (height[right] >= rightEdge) {
                rightEdge = height[right];
            } else {
                result += (rightEdge - height[right]);
            }

        }
    }
    
    return result;
};
