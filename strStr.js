// Implement strStr().

// Returns the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
// O(N + M)
// hash code for each substring, compare it to the target's hash code.

// O(NM)
var strStr = function(haystack, needle) {
  if (haystack === null || needle === null) {
      return -1;
  }

  for (var i = 0; i < haystack.length - needle.length + 1; i++) {
    var j;
    for (j = 0; j < needle.length; j++) {
      if (haystack[i+j] !== needle[j]) {
        break;
      }
    }
    if (j === needle.length) {
      return i;
    }
  }
  return -1;
};
