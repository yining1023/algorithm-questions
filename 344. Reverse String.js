344. Reverse String

Write a function that takes a string as input and returns the string reversed.

Example:
Given s = "hello", return "olleh".

Hide Tags Two Pointers String
Hide Similar Problems (E) Reverse Vowels of a String


/**
 * @param {string} s
 * @return {string}
 */

// two pointers!
var reverseString = function(s) {
    if (s === null || s.length === 0) {
        return s;
    }
    let i = 0, j = s.length - 1;
    // change s to one array first!
    s = s.split('');
    // anytime to write a while, think about change the condition to break this condition
    // no need for i = j
    while (i < j) {
        swap(s, i, j);
        // change i and j!!!!
        i++;
        j--;
    }
    // return this s!!!
    // join s back to a string!
    s = s.join('');
    return s;
};

function swap(s, i, j) {
    temp = s[i];
    s[i] = s[j];
    s[j] = temp;
}

// tel!!
// var reverseString = function(s) {
    // if (s === null || s.length === 0) {
    //     return s;
    // }
    
    // let i = 0, j = s.length - 1;
    // // anytime to write a while, think about change the condition to break this condition
    // // no need for i = j
    // while (i < j) {
    //     // s = ..... don't forget s = !!
    //     s = swap(s, i, j);
    //     // change i and j!!!!
    //     i++;
    //     j--;
    // }
    // // return this s!!!
    // return s;
// };
// // javascript cannot just sign string[i] = xxx. create your own replaceAt function
// String.prototype.replaceAt = function(index, character) {
//     return this.substring(0, index) + character +  this.substring(index + 1, this.length);
// }

// function swap(s, i, j) {
//     temp = s[i];
//     s = s.replaceAt(i, s[j]);
//     s = s.replaceAt(j, temp);
//     // return s!!!
//     return s;
// }

