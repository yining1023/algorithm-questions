526. Beautiful Arrangement

Suppose you have N integers from 1 to N. We define a beautiful arrangement as an array that is constructed by these N numbers successfully if one of the following is true for the ith position (1 ≤ i ≤ N) in this array:

The number at the ith position is divisible by i.
i is divisible by the number at the ith position.
Now given N, how many beautiful arrangements can you construct?

Example 1:
Input: 2
Output: 2
Explanation:

The first beautiful arrangement is [1, 2]:

Number at the 1st position (i=1) is 1, and 1 is divisible by i (i=1).

Number at the 2nd position (i=2) is 2, and 2 is divisible by i (i=2).

The second beautiful arrangement is [2, 1]:

Number at the 1st position (i=1) is 2, and 2 is divisible by i (i=1).

Number at the 2nd position (i=2) is 1, and i (i=2) is divisible by 1.
Note:
N is a positive integer and will not exceed 15.
Hide Company Tags Google
Hide Tags Backtracking

/**
 * @param {number} N
 * @return {number}
 */
// dfs find all possible combination, maxBeautifulCount, isBeautiful(n, index).

// Just try every possible number at each position...
var countArrangement = function(N) {
    if (N === 0) return 0;

    var visited = new Array(N + 1).fill(false);
    var count = 0;

    dfsHelper(N, 1, visited);

    return count;

// put the function in the outerfunction because it's using count as a global var
function dfsHelper(N, pos, visited) {
    // when to exit, wwhen pos reaches N + 1, means all the pos before N are all betiful we get an answer
    if (pos > N) {
        count++;
        return;
    }

    for (let i = 1; i <= N; i++) {
        if (!visited[i] && isBeautiful(i, pos)) {
            //count 不是说一个组合里有几个beautiful组合，只有所有数都满足条件，整个组合算是一个count
            visited[i] = true;// push
            dfsHelper(N, pos + 1, visited);
            visited[i] = false;// pop
        }
    }
}

function isBeautiful(n, index) {
    if (n % index === 0 || index % n === 0) {
        return true;
    }
    return false;
}

};
