531. Lonely Pixel I

Given a picture consisting of black and white pixels, find the number of black lonely pixels.

The picture is represented by a 2D char array consisting of 'B' and 'W', which means black and white pixels respectively.

A black lonely pixel is character 'B' that located at a specific position where the same row and same column don't have any other black pixels.

Example:
Input:
[['W', 'W', 'B'],
 ['W', 'B', 'W'],
 ['B', 'W', 'W']]

Output: 3
Explanation: All the three 'B's are black lonely pixels.
Note:
The range of width and height of the input 2D array is [1,500].
Hide Company Tags Google
Hide Tags Array Depth-first Search

/**
 * @param {character[][]} picture
 * @return {number}
 */
// O(mn) time, O(m + n) space
var findLonelyPixel = function(picture) {
    let m = picture.length, n = picture[0].length;

    let rowCount = new Array(m).fill(0),
        colCount = new Array(n).fill(0);

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (picture[i][j] === 'B') {
                rowCount[i]++;
                colCount[j]++;
            }
        }
    }

    let count = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (picture[i][j] === 'B' && rowCount[i] === 1 && colCount[j] === 1) {
                count++;
            }
        }
    }

    return count;
};

// O(mn) time, O(1) space
// use the matrix to store the colcount and rowcounr info
// if 'B', picture[0][j] < 'Y' && picture[0][j] !== 'V', picture[0][j]++;
// picture[i][0] < 'Y' && picture[i][0] !== 'V', picture[i][0]++
// firstRowCount

// if (picture[i][j] < 'W'  means it was B
// && (picture[0][j] === 'X' || picture[0][j] === 'C')) means only 1 'B' on this col
// picture[i][0] === 'X' || picture[i][0] === 'C' means only 1 'B' on this row
var findLonelyPixel = function(picture) {
    let m = picture.length, n = picture[0].length;
    let firstRowCount = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (picture[i][j] === 'B') {
                if (picture[0][j] < 'Y' && picture[0][j] !== 'V') {
                    picture[0][j] = nextChar(picture[0][j]);
                }
                if (i === 0) firstRowCount++;
                else if (picture[i][0] < 'Y' && picture[i][0] !== 'V') picture[i][0] = nextChar(picture[i][0]);
            }
        }
    }

    let count = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (picture[i][j] < 'W' && (picture[0][j] === 'X' || picture[0][j] === 'C'))
                if (i === 0) count += (firstRowCount === 1) ? 1 : 0;
                else if (picture[i][0] === 'X' || picture[i][0] === 'C') count++;
        }
    }

    return count;

    function nextChar(c) {
        return String.fromCharCode(c.charCodeAt(0) + 1);
    }
};
