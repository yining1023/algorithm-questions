264. Ugly Number II

Write a program to find the n-th ugly number.

Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. For example, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.

Note that 1 is typically treated as an ugly number, and n does not exceed 1690.

Hint:

The naive approach is to call isUgly for every number until you reach the nth one. Most numbers are not ugly. Try to focus your effort on generating only the ugly ones.
An ugly number must be multiplied by either 2, 3, or 5 from a smaller ugly number.
The key is how to maintain the order of the ugly numbers. Try a similar approach of merging from three sorted lists: L1, L2, and L3.
Assume you have Uk, the kth ugly number. Then Uk+1 must be Min(L1 * 2, L2 * 3, L3 * 5).
Credits:
Special thanks to @jianchao.li.fighter for adding this problem and creating all test cases.

Hide Tags Dynamic Programming Heap Math
Hide Similar Problems (H) Merge k Sorted Lists (E) Count Primes (E) Ugly Number (M) Perfect Squares (M) Super Ugly Number

/**
 * @param {number} n
 * @return {number}
 */
// O(n)!!!!time
// 排三个队，每个队是选进去的数从index0开始的，x 2, x 3, x 5，谁小谁出列
// uglys = [1, 2, 3, 4, 5, 6, ...]
// p2 = 0, p3 = 0, p5 = 0, 谁小谁出列以后，p++
// 2, 4, 6, 8, 10, 12, 16..., uglys[p2] * 2
// 3, 6, 9, 12, 15, 18, 24..., uglys[p3] * 3
// 5，10, 15, 20, 25, 30, 40..., uglys[p5] * 5

// (1) 1×2, 2×2, 3×2, 4×2, 5×2, …
// (2) 1×3, 2×3, 3×3, 4×3, 5×3, …
// (3) 1×5, 2×5, 3×5, 4×5, 5×5, …
// The key is how to maintain the order of the ugly numbers. like merging from three sorted lists: L1, L2, and L3.
// Assume you have Uk, the kth ugly number. Then Uk+1 must be Min(L1 * 2, L2 * 3, L3 * 5).
var nthUglyNumber = function(n) {
    let uglys = [1];
    let p2 = 0,
        p3 = 0,
        p5 = 0;

    while(uglys.length < n) {// use while instead of for
        let ugly2 = uglys[p2] * 2,// ugly2 is the next one on list 2, depends on the bigger uglys array
            ugly3 = uglys[p3] * 3,
            ugly5 = uglys[p5] * 5;

        let ugly = Math.min(ugly2, ugly3, ugly5);
        if (ugly !== uglys[uglys.length - 1]) {// check its last
            uglys.push(ugly);
        }

        if (ugly === ugly2) p2++;
        else if (ugly === ugly3)  p3++;
        else if (ugly === ugly5)  p5++;
    }
    return uglys[n - 1];
};

// first time
var nthUglyNumber = function(n) {
    let uglys = [1];
    let p2 = 0, p3 = 0, p5 = 0;

    while (uglys.length < n) {
        ugly2 = uglys[p2] * 2;
        ugly3 = uglys[p3] * 3;
        ugly5 = uglys[p5] * 5;

        let minValue = Math.min(ugly2, ugly3, ugly5);
        if (minValue !== uglys[uglys.length - 1]) {
            uglys.push(minValue); // 2 * 5 和5 * 2可能重复，check if === the last one
        }

        if (minValue === ugly2) {
            p2++;
        }
        if (minValue === ugly3) {
            p3++;
        }
        if (minValue === ugly5) {
            p5++;
        }
    }
    return uglys[n - 1];
};
