// 56. Merge Intervals

// Given a collection of intervals, merge all overlapping intervals.

// For example,
// Given [1,3],[2,6],[8,10],[15,18],
// return [1,6],[8,10],[15,18].

/**
 * Definition for an interval.
 * function Interval(start, end) {
 *     this.start = start;
 *     this.end = end;
 * }
 */
/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
var merge = function(intervals) {
    var results = [];
    
    if (intervals === null || intervals.length === 0) {
        return results;
    }
    
    if (intervals.length === 1) {
        results.push([intervals[0].start, intervals[0].end]);
        return results;
    }
    // sort it depending on its first number, its start
    intervals.sort((a, b) => {
        return a.start - b.start;
    });
    
    // console.log(intervals);
    
    // input: [[1,4],[0,2],[3,5]]; output: [[0,5]]
    // the new one comparing to the last one in the results
    
    results.push([intervals[0].start, intervals[0].end]);

    for (var i = 1; i < intervals.length; i++) {
        var last = results.pop();
        // last[1] not last.end!
        if (last[1] >= intervals[i].start) {
            // merge
            // example [[1,4],[2,3]], end should be the maximum of bother end
            results.push([last[0], Math.max(last[1], intervals[i].end)]);
        } else {
            results.push(last);
            // not push the intervals[i, but push the array!!!]
            results.push([intervals[i].start, intervals[i].end]);
        }
    }
    
    return results;
};
