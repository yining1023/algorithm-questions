374. Guess Number Higher or Lower

We are playing the Guess Game. The game is as follows:

I pick a number from 1 to n. You have to guess which number I picked.

Every time you guess wrong, I'll tell you whether the number is higher or lower.

You call a pre-defined API guess(int num) which returns 3 possible results (-1, 1, or 0):

-1 : My number is lower
 1 : My number is higher
 0 : Congrats! You got it!
Example:
n = 10, I pick 6.

Return 6.
Hide Company Tags Google
Hide Tags Binary Search
Hide Similar Problems (E) First Bad Version (M) Guess Number Higher or Lower II

/* The guess API is defined in the parent class GuessGame.
   @param num, your guess
   @return -1 if my number is lower, 1 if my number is higher, otherwise return 0
      int guess(int num); */
// binary search
// O(logN)
public class Solution extends GuessGame {
    public int guessNumber(int n) {
        int start = 1, end = n; // start starts from 1
        int mid;

        while (start + 1 < end) {
            mid = start + (end - start) / 2;
            if (guess(mid) == 0) {
                return mid;
            } else if (guess(mid) == 1) {
                start = mid;
            } else if (guess(mid) == -1) {// my number is lower, means the right number is lower
                end = mid;
            }
        }

        if (guess(start) == 0) {
            return start;
        } else {
            return end;
        }
    }
}
