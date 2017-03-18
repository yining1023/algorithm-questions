324. Wiggle Sort II

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// O(n)+O(1) after median --- Virtual Indexing
// First I find a median using nth_element. That only guarantees O(n) average time complexity and I don't know about space complexity. I might write this myself using O(n) time and O(1) space, but that's not what I want to show here.

// This post is about what comes after that. We can use three-way partitioning to arrange the numbers so that those larger than the median come first, then those equal to the median come next, and then those smaller than the median come last.

// Ordinarily, you'd then use one more phase to bring the numbers to their final positions to reach the overall wiggle-property. But I don't know a nice O(1) space way for this. Instead, I embed this right into the partitioning algorithm. That algorithm simply works with indexes 0 to n-1 as usual, but sneaky as I am, I rewire those indexes where I want the numbers to actually end up. The partitioning-algorithm doesn't even know that I'm doing that, it just works like normal (it just uses A(x) instead of nums[x]).

// Let's say nums is [10,11,...,19]. Then after nth_element and ordinary partitioning, we might have this (15 is my median):

// index:     0  1  2  3   4   5  6  7  8  9
// number:   18 17 19 16  15  11 14 10 13 12
// I rewire it so that the first spot has index 5, the second spot has index 0, etc, so that I might get this instead:

// index:     5  0  6  1  7  2  8  3  9  4
// number:   11 18 14 17 10 19 13 16 12 15
// And 11 18 14 17 10 19 13 16 12 15 is perfectly wiggly. And the whole partitioning-to-wiggly-arrangement (everything after finding the median) only takes O(n) time and O(1) space.

// If the above description is unclear, maybe this explicit listing helps:

// Accessing A(0) actually accesses nums[1].
// Accessing A(1) actually accesses nums[3].
// Accessing A(2) actually accesses nums[5].
// Accessing A(3) actually accesses nums[7].
// Accessing A(4) actually accesses nums[9].
// Accessing A(5) actually accesses nums[0].
// Accessing A(6) actually accesses nums[2].
// Accessing A(7) actually accesses nums[4].
// Accessing A(8) actually accesses nums[6].
// Accessing A(9) actually accesses nums[8].

// Props to apolloydy's solution, I knew the partitioning algorithm already but I didn't know the name. And apolloydy's idea to partition to reverse order happened to make the index rewiring simpler.

// virual index A(newIndex) = nums[index ***]
var wiggleSort = function(nums) {
    let n = nums.length;

    let start = 0, end = n - 1, i = 0;
    nums = nums.sort((a, b) => { return a - b; });// should implememnt own nth function to find median in O(n) time
    let mid = nums[parseInt(n / 2)];// mid is the real median of the sorted array. then O(nlogn)!!!

    // 3-way-partition-to-wiggly in O(n) time with O(1) space.
    while (i <= end) {
        if (nums[A(i)] > mid) {// if > mid, go to the left, swap with start
            swap(nums, A(i), A(start));
            i++;
            start++;
        } else if (nums[A(i)] < mid) {// if > mid, go to the left, swap with end
            swap(nums, A(i), A(end));
            end--;
        } else {
            i++;
        }
    }

    function A(i) { // convert to a vitual index
        // if (i < parseInt(n / 2)) return i * 2 + 1;
        // else return (i * 2) % n;
        // the above doesn't work when n is odd
        if (n % 2 === 0) return (i * 2 + 1) % (n + 1);
        else return (i * 2 + 1) % n;
    }
};

function swap(nums, i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

// The formula (1+2*(i)) % (n|1)
// n | 1 means when n is odd ( n | 1 = n) and when n is even ( n | 1 = n + 1)
// For example, index array [0, 1, 2, 3, 4, 5] with this formula can be converted into [1, 3, 5, 0, 2, 4]

// O(nlogn) time, O(n) space
// SOLUTION 2 if use the sorted function, no point use three way partition, just re-arrange the order
// Small half:    4 . 3 . 2 . 1 . 0 .
// Large half:    . 9 . 8 . 7 . 6 . 5
// ----------------------------------
// Together:      4 9 3 8 2 7 1 6 0 5
var wiggleSort = function(nums) {
    let n = nums.length;
    let sorted = nums.sort((a, b) => { return a - b; }).slice();// deep copy it, will vary nums later, will change sorted too

    // two pointers to re-arrange
    let k = 0, j = n - 1;
    if (n % 2 === 0) i = parseInt(n / 2) - 1;// when n is odd or even, i starts from different position
    else i = parseInt(n / 2);

    while (k < n) {
        if (k % 2 === 0) {
            nums[k] = sorted[i];
            i--;
        } else if (k % 2 !== 0) {
            nums[k] = sorted[j];
            j--;
        }
        k++;
    }
};
