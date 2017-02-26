276. Paint Fence

There is a fence with n posts, each post can be painted with one of the k colors.

You have to paint all the posts such that no more than two adjacent fence posts have the same color.

Return the total number of ways you can paint the fence.

Note:
n and k are non-negative integers.

Hide Company Tags Google
Hide Tags Dynamic Programming
Hide Similar Problems (E) House Robber (M) House Robber II (E) Paint House (H) Paint House II

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
// O(n) time, O(1) space
// If n == 1, there would be k-ways to paint.

// if n == 2, there would be two situations:

// 2.1 You paint same color with the previous post: k*1 ways to paint, named it as same
// 2.2 You paint differently with the previous post: k*(k-1) ways to paint this way, named it as dif
// So, you can think, if n >= 3, you can always maintain these two situations,
// You either paint the same color with the previous one, or differently.

// Since there is a rule: "no more than two adjacent fence posts have the same color."

// We can further analyze:

// from 2.1, since previous two are in the same color, next one you could only paint differently, and it would form one part of "paint differently" case in the n == 3 level, and the number of ways to paint this way would equal to same*(k-1).
// from 2.2, since previous two are not the same, you can either paint the same color this time (dif*1) ways to do so, or stick to paint differently (dif*(k-1)) times.
// Here you can conclude, when seeing back from the next level, ways to paint the same, or variable same would equal to dif*1 = dif, and ways to paint differently, variable dif, would equal to same*(k-1)+dif*(k-1) = (same + dif)*(k-1)
// n = 1, => k
// n = 2, first: k, second: same = 1, diff = k - 1 => same = k, diff = k (k - 1)  
// n = 3, first: k, second: same = 1, diff = k - 1 => same = k, diff = k (k - 1), third: 
//        diff:same * (k-1), diff*(k-1),same:diff*1 
var numWays = function(n, k) {
    if (n === null || n === 0) {
        return 0;
    }
    if (n === 1) {
        return k;
    }
    // when n === 2, same = k, diff = (k - 1) * k
    let same = k, diff = (k - 1) * k;
    for (let i = 3; i < n + 1; i++) {
        let tempSame = same; // save same first, otherwise it changes before diff is updates, diff is based on old same
        same = diff;
        diff = (tempSame + diff) * (k - 1);
    }
    return same + diff;
};
