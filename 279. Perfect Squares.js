279. Perfect Squares

Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.

For example, given n = 12, return 3 because 12 = 4 + 4 + 4; given n = 13, return 2 because 13 = 4 + 9.

Credits:
Special thanks to @jianchao.li.fighter for adding this problem and creating all test cases.

Hide Company Tags Google
Hide Tags Dynamic Programming Breadth-first Search Math
Hide Similar Problems (E) Count Primes (M) Ugly Number II

/**
 * @param {number} n
 * @return {number}
 */
// 1, 4, 9, 16
// square(12) = 3.xxxx, -> parseInt 3, 3^2 = 9; so 9, 12 - 9 = 3, square(3) = 1, so 1

// var numSquares = function(n) {
//     var res = 0;

//     while(n >= 1) {
//         if (parseInt(Math.sqrt(n)) > 1) {
//             res++;
//             n = n - parseInt(Math.sqrt(n)) * parseInt(Math.sqrt(n));
//         } else if (parseInt(Math.sqrt(n)) === 1){
//             res++;
//             n = n - 1;
//         }
//     }
//     return res;
// };
// the above doesn't work, when the first number is not the largest,
// when 12, 12 = 4 + 4 + 4, return 3, not 9 + 1 + 1 + 1, return 4

// BFS, Return depth
// the time complexity should be O(lg(x)),But the upper bound of the time complexity is O(n).?
//           0
//    1      4   9
//  2 5 10  5 8  10
//......11   9 12 ....
var numSquares = function(n) {
    var queue = [], visited = new Map();
    queue.push(0);
    visited.set(0, true);

    var depth = 0;
    while (queue.length !== 0) {
        let size = queue.length;
        depth++;
        for (let j = 0; j < size; j++) {
            let u = queue.shift();
            for (let i = 1; u + i * i <= n; i++) { // i should start from 1, <= n! inculde = n
                let v = u + i * i;
                if (v > n)
                    break;
                else if (v === n)
                    return depth;
                else if (!visited.has(v)) {
                    queue.push(v);
                    visited.set(v, true);
                }
            }
        }
    }

    return depth;
};
