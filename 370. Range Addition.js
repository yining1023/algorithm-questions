370. Range Addition

Assume you have an array of length n initialized with all 0's and are given k update operations.

Each operation is represented as a triplet: [startIndex, endIndex, inc] which increments each element of subarray A[startIndex ... endIndex] (startIndex and endIndex inclusive) with inc.

Return the modified array after all k operations were executed.

Example:

Given:

    length = 5,
    updates = [
        [1,  3,  2],
        [2,  4,  3],
        [0,  2, -2]
    ]

Output:

    [-2, 0, 3, 5, 3]
Explanation:

Initial state:
[ 0, 0, 0, 0, 0 ]

After applying operation [1, 3, 2]:
[ 0, 2, 2, 2, 0 ]

After applying operation [2, 4, 3]:
[ 0, 2, 5, 5, 3 ]

After applying operation [0, 2, -2]:
[-2, 0, 3, 5, 3 ]
Hint:

Thinking of using advanced data structures? You are thinking it too complicated.
For each update operation, do you really need to update all elements between i and j?
Update only the first and end element is sufficient.
The optimal time complexity is O(k + n) and uses O(1) extra space.
Credits:
Special thanks to @vinod23 for adding this problem and creating all test cases.

Hide Company Tags Google
Hide Tags Array

/**
 * @param {number} length
 * @param {number[][]} updates
 * @return {number[]}
 */
// brute force, O(kn), loop the n length array k times

// O(K + N)time
// Just store every start index for each value and at [endindex + 1] - minus it
// for example it will look like:
// [1 , 3 , 2] , [2, 3, 3] (length = 5)
// res[ 0, 2, ,0, 0 -2 ]
// res[ 0 ,2, 3, 0, -5]
// sum 0, 2, 5, 5, 0
// res[0, 2, 5, 5, 0]

// Just explain res->sum:
// res[0,2,3,0,-5]:
// sum[0] = res[0] = 0;
// sum[1] = res[0] + res[1] = 0 + 2 = 2;
// sum[2] = res[0] + res[1] + res[2] = 0 + 2 + 3 = 5;
// sum[3] = res[0] + res[1] + res[2] + res[3] = 0 + 2 + 3 + 0 = 5;
// sum[4] = res[0] + res[1] + res[2] + res[3] + res[4] = 0 + 2 + 3 + 0 + (-5) = 0;
// sum[0,2,5,5,0]
var getModifiedArray = function(length, updates) {
    let res = new Array(length).fill(0);//

    for (let k = 0; k < updates.length; k++) {
        res[updates[k][0]] +=  updates[k][2];
        if (updates[k][1] + 1 < length) res[updates[k][1] + 1] -= updates[k][2];// not updates.length, it's length
    }

    for (let i = 1; i < res.length; i++) {
        res[i] += res[i - 1];
    }
    return res;
};
