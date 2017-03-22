278. First Bad Version
// You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

// Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.

// You are given an API bool isBadVersion(version) which will return whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    // find the first bad version
    return function(n) {
        if (n < 1) {
            return -1;
        }

        var start = 1,
            end = n,
            mid;

        while(start + 1 < end) {
            mid = start + parseInt((end - start) / 2);

            if (isBadVersion(mid)) {//往前找
                end = mid;
            } else {
                start = mid;
            }
        }
        // check start first, because it's finding first position
        if (isBadVersion(start)) {
            return start;
        }

        if (isBadVersion(end)) {
            return end;
        }

        return -1;
    };
};
