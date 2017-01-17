// Implement int sqrt(int x).

// Compute and return the square root of x.

// Math.round( 20.5);  //  21
// parseInt(15.1) => 15

/**
 * @param {number} x
 * @return {number}
 */
// sqrt(3) = 1

// sqrt(4) = 2

// sqrt(5) = 2

// sqrt(10) = 3

// think carefully about the condition, the last positon of a number^2 that is SMALLER or equals to x
// typo!!! while (start + 1 < END!!! not x)
var mySqrt = function(x) {
    if (x < 0 || x === null) {
        return -1;
    }

    var start = 0,
        end = x,
        mid;

    while(start + 1 < end) {
        mid = start + parseInt((end - start) / 2);
        
        if (mid * mid <= x) {
            start = mid;
        } else {
            end = mid;
        }
    }

// LAST position!!! check end first!!
    if (end * end <= x) {
        return end;    
    }
    
    if (start * start <= x) {
        return start;
    }

};