533. Lonely Pixel II

Given a picture consisting of black and white pixels, and a positive integer N, find the number of black pixels located at some specific row R and column C that align with all the following rules:

Row R and column C both contain exactly N black pixels.
For all rows that have a black pixel at column C, they should be exactly the same as row R
The picture is represented by a 2D char array consisting of 'B' and 'W', which means black and white pixels respectively.

Example:
Input:
[['W', 'B', 'W', 'B', 'B', 'W'],
 ['W', 'B', 'W', 'B', 'B', 'W'],
 ['W', 'B', 'W', 'B', 'B', 'W'],
 ['W', 'W', 'B', 'W', 'B', 'W']]

N = 3
Output: 6
Explanation: All the bold 'B' are the black pixels we need (all 'B's at column 1 and 3).
        0    1    2    3    4    5         column index
0    [['W', 'B', 'W', 'B', 'B', 'W'],
1     ['W', 'B', 'W', 'B', 'B', 'W'],
2     ['W', 'B', 'W', 'B', 'B', 'W'],
3     ['W', 'W', 'B', 'W', 'B', 'W']]
row index

Take 'B' at row R = 0 and column C = 1 as an example:
Rule 1, row R = 0 and column C = 1 both have exactly N = 3 black pixels.
Rule 2, the rows have black pixel at column C = 1 are row 0, row 1 and row 2. They are exactly the same as row R = 0.

Note:
The range of width and height of the input 2D array is [1,200].
Hide Company Tags Google
Hide Tags Array Depth-first Search
Hide Similar Problems (M) Lonely Pixel II

/**
 * @param {character[][]} picture
 * @param {number} N
 * @return {number}
 */
// O(m*n) Solution, HashMap

// Scan each row. If that row has N black pixels, put a string signature, which is concatenation of each characters in that row, as key and how many times we see that signature into a HashMap. Also during scan each row, we record how many black pixels in each column in an array colCount and will use it in step 2.
// For input:
// [['W', 'B', 'W', 'B', 'B', 'W'],
// ['W', 'B', 'W', 'B', 'B', 'W'],
// ['W', 'B', 'W', 'B', 'B', 'W'],
// ['W', 'W', 'B', 'W', 'B', 'B']]
// We will get a HashMap:
// {"WBWBBW": 3, "WWBWBB": 1}
// and colCount array:
// [0, 3, 1, 3, 4, 1]
// Go through the HashMap and if the count of one signature is N, those rows potentially contain black pixels we are looking for. Then we validate each of those columns. For each column of them has N black pixels (lookup in colCount array), we get N valid black pixels.
// For above example, only the first signature "WBWBBW" has count == 3. We validate 3 column 1, 3, 4 where char == 'B', and column 1 and 3 have 3 'B', then answer is 2 * 3 = 6.

// need a hashmap like {"WBWBBW": 3, "WWBWBB": 1}, and a colCount [0, 3, 1, 3, 4, 1]
/**
 * @param {character[][]} picture
 * @param {number} N
 * @return {number}
 */
// O(m*n) Solution, HashMap

// Scan each row. If that row has N black pixels, put a string signature, which is concatenation of each characters in that row, as key and how many times we see that signature into a HashMap. Also during scan each row, we record how many black pixels in each column in an array colCount and will use it in step 2.
// For input:
// [['W', 'B', 'W', 'B', 'B', 'W'],
// ['W', 'B', 'W', 'B', 'B', 'W'],
// ['W', 'B', 'W', 'B', 'B', 'W'],
// ['W', 'W', 'B', 'W', 'B', 'B']]
// We will get a HashMap:
// {"WBWBBW": 3, "WWBWBB": 1}
// and colCount array:
// [0, 3, 1, 3, 4, 1]
// Go through the HashMap and if the count of one signature is N, those rows potentially contain black pixels we are looking for. Then we validate each of those columns. For each column of them has N black pixels (lookup in colCount array), we get N valid black pixels.
// For above example, only the first signature "WBWBBW" has count == 3. We validate 3 column 1, 3, 4 where char == 'B', and column 1 and 3 have 3 'B', then answer is 2 * 3 = 6.

// need a hashmap like {"WBWBBW": 3, "WWBWBB": 1}, and a colCount [0, 3, 1, 3, 4, 1]

// 1. 首先算每一行的b的个数，要是===n，放入map中
// 2. loop整个map，看colcount[]符不符合===n
var findBlackPixel = function(picture, N) {
    let m = picture.length,
        n = picture[0].length;

    let map = new Map();
    let colCount = new Array(n).fill(0);

    for (let i = 0; i < m; i++) { // 每一行的b的个数也要算上呀
        let curRowKey = '';
        let curRowCount = 0;
        for (let j = 0; j < n; j++) {
            curRowKey += picture[i][j];
            if (picture[i][j] === 'B') {
                colCount[j]++;
                curRowCount++;
            }
        }
        if (curRowCount === N) {
            if (map.has(curRowKey)) map.set(curRowKey, map.get(curRowKey) + 1);
            else map.set(curRowKey, 1);
        }

    }

    let results = 0;
    map.forEach( (value, key) => {
        if (value === N) { // N is the input, not any value can do, has to be N
            for (let k = 0; k < n; k++) {
                if (key[k] === 'B' && colCount[k] === value) results += N;
            }
        }
    });

    return results;
};

