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
// In general, the time complexity of BFS is O(|V| + |E|) where |V| is the number of vertices in the graph and |E| is the number of edges in the graph.
// As in the constructed graph, |V| = n and |E| <= n^2. The time complexity of the BFS here is O(n^2).
// why |V| = n ? only check not visted node!
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

// Math O(sqrt(n)) time
// Lagrange's four-square theorem, also known as Bachet's conjecture, states that every natural number can be represented as the sum of four integer squares.
// p = a1^2 + a2^2 + a3^2 + a4^2
// 3 = 1^2 + 1^2 + 1^2 + 0^2
// 31 = 5^2 + 2^2 + 1^2 + 1^2
// 310 = 17^2 + 4^2 + 2^2 + 1^2

// Legendre's three-square theorem
// n = x^2 + y^2 + z^2 if and only if n is not of the form n = 4^k*(8*m + 7)
// like 7, 15, 23, 28, 31, 39, 47, 55, 60, 63, 71 ...

// possible results can only be 1, 2, 3, 4
var numSquares = function(n) {
    if (isSquare(n)) return 1;

    //check if the result is 3
    while ((n & 3) === 0) {// n % 4 === 0, n = 4^k*(8*m + 7) get ride of 4, 15=1111 & 3 !== 0, 60 = 111100, get ride of 00
        n = n >> 2;
    }

    // when use & use (), (n & 7) otherwise error
    if ((n & 7) === 7) { // has 7 in it, eg, 15 = 1111, 1111 & 111 = 111 (7)
        return 4;
    }

    // check if the results is 2
    let squareN = parseInt(Math.sqrt(n));
    for (let i = 1; i <= squareN; i++) {
        if (isSquare(n - i * i)) return 2;
    }

    return 3;
};

function isSquare(m) {
    let square = parseInt(Math.sqrt(m));
    return m === square * square;
}

