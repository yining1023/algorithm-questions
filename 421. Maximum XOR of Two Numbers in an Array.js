421. Maximum XOR of Two Numbers in an Array

Given a non-empty array of numbers, a0, a1, a2, … , an-1, where 0 ≤ ai < 231.

Find the maximum result of ai XOR aj, where 0 ≤ i, j < n.

Could you do this in O(n) runtime?

Example:

Input: [3, 10, 5, 25, 2, 8]

Output: 28

Explanation: The maximum result is 5 ^ 25 = 28.
Hide Company Tags Google
Hide Tags Bit Manipulation Trie

/**
 * @param {number[]} nums
 * @return {number}
 */

// Logical Bitwise Operations
// bit 1	bit 2	OR (|)	AND (&)	XOR (^)
// 0	0	0	0	0
// 1	0	1	0	1
// 0	1	1	0	1
// 1	1	1	1	0

// | (Bitwise OR) sets a bit to 1 if one or both of the corresponding bits in its operands are 1, and to 0 if both of the corresponding bits are 0. In other words, | returns one in all cases except where the corresponding bits of both operands are zero. The resulting bit pattern is the "set" (1 or true) bits of any of the two operands. This property is used to "set" or "turn on" a "flag" (bit set to one) in your flags or options variable regardless of whether that flag was set previously or not. Multiple flag bits can be set if a combo MASK is defined.
// To set or turn on a flag bit(s)
// flags = flags | MASK;
// or, more succintly
// flags |= MASK;


// ^ (Bitwise XOR or exclusive OR) sets the bit to 1 where the corresponding bits in its operands are different, and to 0 if they are the same. Even 1 ^ 1 evaluates to 0 unlike the regular Bitwise OR.

// ~ (Bitwise NOT) takes only one parameter and inverts each bit in the operand, changing all the ones to zeros and zeros to ones. This is useful when "unsetting" or "turning off" a flag.

// This is (32n), which is still O(n). The length of Integer when handle as Byte is 32.

// I saw deeply and found out a very important xor feature I missed, that is: if a^b=c, then a^c=b, b^c=a. That's why the answer using this code:

//             for(int prefix : set){
//                 if(set.contains(tmp ^ prefix)) {
//                     max = tmp;
//                     break;
//                 }
//             }
var findMaximumXOR = function(nums) {
    let max = 0, mask = 0;
    let set = new Set();
    // search from left to right, find out for each bit is there two numbers that has different value
    for (let i = 31; i >= 0; i--) {
        // mask contains the bits considered so far
        mask = max | (1 << i);

        set.clear();

        // store prefix of all number with right i bits discarded
        nums.forEach(num => {
            set.add(mask & num);
        });

        // now find out if there are two prefix with different i-th bit
        // if there is, the new max should be current max with one 1 bit at i-th position, which is candidate
        // and the two prefix, say A and B, satisfies:
        // A ^ B = candidate
        // so we also have A ^ candidate = B or B ^ candidate = A
        // thus we can use this method to find out if such A and B exists in the set
        let canidate = max | (1 << i);
        set.forEach(value => {
            if (set.has(value ^ canidate)) max = canidate;
        });
    }

    return max;
};

