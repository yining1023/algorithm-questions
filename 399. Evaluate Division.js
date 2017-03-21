399. Evaluate Division

Equations are given in the format A / B = k, where A and B are variables represented as strings, and k is a real number (floating point number). Given some queries, return the answers. If the answer does not exist, return -1.0.

Example:
Given a / b = 2.0, b / c = 3.0.
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ? .
return [6.0, 0.5, -1.0, 1.0, -1.0 ].

The input is: vector<pair<string, string>> equations, vector<double>& values, vector<pair<string, string>> queries , where equations.size() == values.size(), and the values are positive. This represents the equations. Return vector<double>.

According to the example above:

equations = [ ["a", "b"], ["b", "c"] ],
values = [2.0, 3.0],
queries = [ ["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"] ].
The input is always valid. You may assume that evaluating the queries will result in no division by zero and there is no contradiction.

Hide Company Tags Google
Hide Tags Graph

/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
// graph
// Image a/b = k as a link between node a and b, the weight from a to b is k, the reverse link is 1/k.
// Query is to find a path between two nodes.
// pairs = {
//     "a" : ["b"],
//     "b" : ["a", "c"],
//     "c" : ["b"]
// }

// pairValues = {
//     "a" : [2.0],
//     "b" : [0.5, 3.0],
//     "c" : [0.33]
// }
var calcEquation = function(equations, values, queries) {
    // 1. use the equations(get all nodes) and values(get all edges) to build a graph
    // 2. use queries and dfs to search on the graph
    var pairs = new Map(),
        pairValues = new Map();

    for (let i = 0; i < equations.length; i++) {
        // 1.1 get the nodes
        let equation = equations[i];
        // get equation[0], equation[1] as "a" "b"
        if (!pairs.has(equation[0])) {
            pairs.set(equation[0], []);
            pairValues.set(equation[0], []);
        }
        if (!pairs.has(equation[1])) {
            pairs.set(equation[1], []);
            pairValues.set(equation[1], []);
        }

        pairs.get(equation[0]).push(equation[1]);
        pairs.get(equation[1]).push(equation[0]);

        // 1.2 get the edges
        pairValues.get(equation[0]).push(values[i]);
        pairValues.get(equation[1]).push(1 / values[i]);
    }

    // 2. dfs get all results
    var results = [];
    for (let j = 0; j < queries.length; j++) {
        let query = queries[j];
        let result = dfs(query[0], query[1], pairs, pairValues, new Set(), 1);
        if (result === 0) result = -1;
        results.push(result);
    }

    return results;
};
// set id for keeping track of if has been to this node or not
function dfs(start, end, pairs, pairValues, set, value) {
    if (!pairs.has(start)) return 0;
    if (set.has(start)) return 0; // if it's a loop, has already been to start in the set
    if (start === end) return value; // when to exit

    set.add(start);

    // available next node for start
    let strList = pairs.get(start);
    let valueList = pairValues.get(start);// don't copy paste, pairs should be pairValues
    // try every next possible node
    // temp should be putside, because ging to return temp in the end
    let temp;
    for (let k = 0; k < strList.length; k++) {
        temp = dfs(strList[k], end, pairs, pairValues, set, value * valueList[k]);// go to next level dfs
        if (temp !== 0) break;
        // temp === 0 means either this node is not in pairs, or there is loop, both means this path is invalid
        // temp !== 0, means found a valid path to end!! if (start === end) return value;
    }

    set.delete(start);
    return temp;
}

