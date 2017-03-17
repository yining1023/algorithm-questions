393. UTF-8 Validation
A character in UTF8 can be from 1 to 4 bytes long, subjected to the following rules:

For 1-byte character, the first bit is a 0, followed by its unicode code.
For n-bytes character, the first n-bits are all one's, the n+1 bit is 0, followed by n-1 bytes with most significant 2 bits being 10.
This is how the UTF-8 encoding would work:

   Char. number range  |        UTF-8 octet sequence
      (hexadecimal)    |              (binary)
   --------------------+---------------------------------------------
   0000 0000-0000 007F | 0xxxxxxx
   0000 0080-0000 07FF | 110xxxxx 10xxxxxx
   0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
   0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
Given an array of integers representing the data, return whether it is a valid utf-8 encoding.

Note:
The input is an array of integers. Only the least significant 8 bits of each integer is used to store the data. This means each integer represents only 1 byte of data.

Example 1:

data = [197, 130, 1], which represents the octet sequence: 11000101 10000010 00000001.

Return true.
It is a valid utf-8 encoding for a 2-bytes character followed by a 1-byte character.
Example 2:

data = [235, 140, 4], which represented the octet sequence: 11101011 10001100 00000100.

Return false.
The first 3 bits are all one's and the 4th bit is 0 means it is a 3-bytes character.
The next byte is a continuation byte which starts with 10 and that's correct.
But the second continuation byte does not start with 10, so it is invalid.
Hide Company Tags Google
Hide Tags Bit Manipulation

/**
 * @param {number[]} data
 * @return {boolean}
 */
//   0000 0000-0000 007F | 0xxxxxxx
//   0000 0080-0000 07FF | 110xxxxx 10xxxxxx
//   0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
//   0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
//   first number either < 128, either starts with 11..., from the second number, has to be 10.... so >128 <128+64
//   either starts from 111..., second number 100..., third number 10..., then can start have another round

// n > 247, 11111... false
// n < 128, can stand aline, but count has to be 0
// n >= 128, 10..... can let count --, when count < 0, false
// 224 > n >= 192 means at least 11000000 (next 1 number will at least 128) (bitCount = 1)
// 240 > n >= 224 mens at least 111000000 (next 2 number will at least 128) (bitCount = 2)
// n >= 240 means at least 11110000 (next 3 number will at least 128) (bitCount = 3)
// in the end, if count === 0, means finished everything => true

var validUtf8 = function(data) {
    let bitCount = 0;
    // case1: number > 192,; case2: numebr > 128; case3: number < 128
    for (let i = 0; i < data.length; i++) {
        if (data[i] > 247) return false; // edge case: [248,130,130,130] 248 => 11111....
        else if (data[i] >= 192) {
            if (bitCount !== 0) return false;
            else if (data[i] >= 240) bitCount = 3;
            else if (data[i] >= 224) bitCount = 2;
            else bitCount = 1;
        } else if (data[i] >= 128) {
            bitCount--;
            if (bitCount < 0) return false;
        } else if (bitCount > 0) {
            return false;
        }
    }
    return bitCount === 0;
};

// Solution2: bit manipulation
// use 0bxxxxx to represent bianary number, 0oxxxx for octal number
var validUtf8 = function(data) {
    let count = 0;
    for (let i = 0; i < data.length; i++) {// use for not forEach, `return` would be problematic
        if (data[i] >> 3 === 0b11111) return false;
        if (count === 0) {
            if (data[i] >> 5 === 0b110) count = 1;
            else if (data[i] >> 4 === 0b1110) count = 2;
            else if (data[i] >> 3 === 0b11110) count = 3;
            else if (data[i] >> 7) return false;//not enough 8 digits
        } else {
            if (data[i] >> 6 !== 0b10) return false;
            count--;
        }
    }
    return count === 0;
};
