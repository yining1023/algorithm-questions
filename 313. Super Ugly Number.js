313. Super Ugly Number
Write a program to find the nth super ugly number.

Super ugly numbers are positive numbers whose all prime factors are in the given prime list primes of size k. For example, [1, 2, 4, 7, 8, 13, 14, 16, 19, 26, 28, 32] is the sequence of the first 12 super ugly numbers given primes = [2, 7, 13, 19] of size 4.

Note:
(1) 1 is a super ugly number for any given primes.
(2) The given numbers in primes are in ascending order.
(3) 0 < k ≤ 100, 0 < n ≤ 106, 0 < primes[i] < 1000.
(4) The nth super ugly number is guaranteed to fit in a 32-bit signed integer.

Credits:
Special thanks to @dietpepsi for adding this problem and creating all test cases.

Hide Company Tags Google
Hide Tags Math Heap
Hide Similar Problems (M) Ugly Number II

/**
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
// got ugly number 2, the primes are statis, not the primes are dynamic
// The idea is from Ugly Number II.
// Similarly, for this problem, just use loop to replace above i2, i3, i5.
// O(n * k) k is the primes.length
var nthSuperUglyNumber = function(n, primes) {
    let uglys = [1];
    let ps = new Array(primes.length).fill(0);// ps = [0, 0, 0], [p2, p3, p5]

    while(uglys.length < n) {
        let min = Infinity;
        for (let i = 0; i < primes.length; i++) {
            min = Math.min(min, uglys[ps[i]] * primes[i]);
        }
        if (min !== uglys[uglys.length - 1]) {
            uglys.push(min);
        }
        for (let j = 0; j < primes.length; j++) {
            if (min === uglys[ps[j]] * primes[j]) ps[j]++;
        }
    }
    return uglys[n -1];
};


// code for Ugly Number 2
// var nthUglyNumber = function(n) {
//     let uglys = [1];
//     let p2 = 0,
//         p3 = 0,
//         p5 = 0;

//     while(uglys.length < n) {// use while instead of for
//         let ugly2 = uglys[p2] * 2,// ugly2 is the next one on list 2, depends on the bigger uglys array
//             ugly3 = uglys[p3] * 3,
//             ugly5 = uglys[p5] * 5;

//         let ugly = Math.min(ugly2, ugly3, ugly5);
//         if (ugly !== uglys[uglys.length - 1]) {// check its last
//             uglys.push(ugly);
//         }

//         if (ugly === ugly2) p2++;
//         else if (ugly === ugly3)  p3++;
//         else if (ugly === ugly5)  p5++;
//     }
//     return uglys[n - 1];
// };
