247. Strobogrammatic Number II

A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Find all strobogrammatic numbers that are of length = n.

For example,
Given n = 2, return ["11","69","88","96"].

Hint:

Try to use recursion and notice that it should recurse with n - 2 instead of n - 1.
Hide Company Tags Google
Hide Tags Math Recursion
Hide Similar Problems (E) Strobogrammatic Number (H) Strobogrammatic Number III

/**
 * @param {number} n
 * @return {string[]}
 */
// O与答案个数m有关，n位，每两位00/11/88/69/96, 4 or 5^(n/2)!
// n = 2, 4; n = 3, 12; n = 4, 20
// O(4^N)?
var findStrobogrammatic = function(n) {
    if (n === null || n === 0) {
        return [];
    }
    let strobos;
    if (n % 2 === 1) {
        strobos = ["0", "1", "8"];
    } else {
        strobos = [""];
    }
    
    let base = ["00", "11", "88", "69", "96"];

    while (n > 1) {
        n -= 2;
        let temp = [];
        for (let j = 0; j < strobos.length; j++) {
            for (let i = (n > 1) ? 0 : 1; i < base.length; i++) {
                temp.push(base[i].substr(0, 1) + strobos[j] + base[i].substr(1, 1));
            }
        }
        strobos = temp.slice();
    }
    return strobos;
};
