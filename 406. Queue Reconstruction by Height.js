406. Queue Reconstruction by Height

Suppose you have a random list of people standing in a queue. Each person is described by a pair of integers (h, k), where h is the height of the person and k is the number of people in front of this person who have a height greater than or equal to h. Write an algorithm to reconstruct the queue.

Note:
The number of people is less than 1,100.

Example

Input:
[[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]

Output:
[[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
Hide Company Tags Google
Hide Tags Greedy
Hide Similar Problems (H) Count of Smaller Numbers After Self

/**
 * @param {number[][]} people
 * @return {number[][]}
 */
// O(nlogn)?
// Pick out tallest group of people and sort them in a subarray (S). Since there's no other groups of people taller than them, therefore each guy's index will be just as same as his k value.
// For 2nd tallest group (and the rest), insert each one of them into (S) by k value. So on and so forth.
// E.g.
// input: [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
// subarray after step 1: [[7,0], [7,1]]
// subarray after step 2: [[7,0], [6,1], [7,1]]
var reconstructQueue = function(people) {
    var results = [];
    if (people === null || people.length === 0) return results;

    var peopleDict = {}, height = [];// height has all heights, peopleDict[height] = [[k1, i1], [k2, i2]...]
    // obtain everyone's info
    // key=height, value=k-value, index in original array
    for (let i = 0; i < people.length; i++) {
        let p = people[i];
        if (peopleDict[p[0]] !== undefined) {
            peopleDict[p[0]].push([p[1], i]);
        } else {
            peopleDict[p[0]] = [];// let it be an array first then push, form a proper [[...]]
            peopleDict[p[0]].push([p[1], i]);
            height.push(p[0]);
        }
    }

    height = height.sort((a, b) => { return b - a; }); // sort from tallest
    for (let j = 0; j < height.length; j++) {
        let insertPeople = peopleDict[height[j]];

        if (insertPeople.length > 1) {
            insertPeople = insertPeople.sort((a, b) => {return a[0] - b[0]});
        }

        for (let p = 0; p < insertPeople.length; p++) {
            let q = insertPeople[p];
            results.splice(q[0], 0, people[q[1]]);// use people to acess the original array, p[0] is the results's index
        }
    }

    return results;
};

// arr.splice(index, 0, item);
// will insert item into arr at the specified index (deleting 0 items first, that is, it's just an insert).
// array.splice(start, deleteCount, item1, item2, ...)
// The splice() method changes the contents of an array by removing existing elements and/or adding new elements.
