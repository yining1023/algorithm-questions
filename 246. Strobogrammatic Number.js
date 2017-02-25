246. Strobogrammatic Number

A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

Write a function to determine if a number is strobogrammatic. The number is represented as a string.

For example, the numbers "69", "88", and "818" are all strobogrammatic.

Hide Company Tags Google
Hide Tags Hash Table Math
Hide Similar Problems (M) Strobogrammatic Number II (H) Strobogrammatic Number III

/**
 * @param {string} num
 * @return {boolean}
 */
// O(N)
// 1, 2, 3, 4, 5, 6, 7, 8, 9, 0
// 1, 8, 0, 69, 96
// two pointers and hash map
var isStrobogrammatic = function(num) {
    if (num === null) {
        return num;
    }
    let hash = {
        '0': '0',
        '1': '1',
        '8': '8',
        '6': '9',
        '9': '6'
        
    }
    let i = 0, j = num.length - 1;
    // use i<= j, no need to check when i === j seperately
    for (let i = 0, j = num.length - 1; i <= j; i++, j--) {
        if (num[i] !== hash[num[j]]) {
            return false;
        }
    }
    return true;
};

// first time
// var isStrobogrammatic = function(num) {
//     if (num === null) {
//         return num;
//     }
//     let str = '108';
//     let i = 0, j = num.length - 1;
//     // use i<= j, no need to check when i === j seperately
//     for (let i = 0, j = num.length - 1; i <= j; i++, j--) {
//         if ((num[i] === '6' && num[j] === '9') || (num[i] === '9' && num[j] === '6')) {
//             continue;
//         }
//         // 10 is false too so add num[i] === num[j]
//         if (str.indexOf(num[i]) === -1 || str.indexOf(num[j]) === -1 || num[i] !== num[j]) {
//             return false;
//         }
//     }
//     return true;
// };
