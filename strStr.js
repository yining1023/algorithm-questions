// Implement strStr().

// Returns the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */

// O(NM)
var strStr = function(haystack, needle) {
  // no need to check if they are strings
  if (haystack === null || needle === null) {
      return -1;
  }

  // stop i in advance
  for (var i = 0; i < haystack.length - needle.length + 1; i++) {
    var j;
    // two for loops
    for (j = 0; j < needle.length; j++) {
      if (haystack[i+j] !== needle[j]) {
        break; // if one doesn't match, break
      }
    }
    // the final state, j === needle.length
    if (j === needle.length) {
      return i;
    }
  }
  // return -1 has to be out of the for loop
  return -1;
};

