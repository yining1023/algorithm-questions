// // 122. Best Time to Buy and Sell Stock II

// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times). However, you may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

// Hide Company Tags Bloomberg
// Hide Tags Array Greedy
// Hide Similar Problems (E) Best Time to Buy and Sell Stock (H) Best Time to Buy and Sell Stock III (H) Best Time to Buy and Sell Stock IV (M) Best Time to Buy and Sell Stock with Cooldown

/**
 * @param {number[]} prices
 * @return {number}
 */
// find all the going up ranges and add all of them~
// var maxProfit = function(prices) {
    // if (prices === null || prices.length === 0) {
    //     return 0;
    // }
    
//     var min = prices[0], max = -Infinity, result = 0, newResult;
//     var i;
//     for (i = 1; i < prices.length - 1; i++) {
//         if (prices[i] <= prices[i + 1] && prices[i] <= prices[i - 1]) {
//             min = prices[i];
//             // reset max, start over, max has to be after min!
//             max = -Infinity;
//         // [4, 6, 6] corner cases, so prices[i] >=!!!! prices[i + 1]
//         } else if (prices[i] >= prices[i + 1] && prices[i] > prices[i - 1]){
//             max = prices[i];
//         } else {
//             continue;
//         }
//         newResult = Math.max(0, max - min);
//         result += newResult;
//     }
    
//     if (i === prices.length - 1 && prices[i] > prices[i - 1]) {
//         // not - prices[i - 1], but min, because prices[i] might not be the minimum number in the round
//         result += prices[i] - min;
//     }
    
//     return result;
// };

// 思路：Best Time to Buy and Sell Stock II

// II并没有限制总的买卖次数，只限制了当天只能买或卖。所以可以采用greedy的方法，来获得所有可能的正利润。以如下序列说明：

// 2 1 3 4 5 4 2 8 7

// 只要prices[i] - prices[i-1]>0，我们就在第i-1天买入，第i天抛出。这样可以包括所有可能赚取利润的区间。


// Actually just compare i and i + 1, if i + 1 > i, add it to the result
var maxProfit = function(prices) {
    // when [1], return 0 cannot make any money
    if (prices === null || prices.length === 0 || prices.length === 1) {
        return 0;
    }
    
    // give res initial value, otherwise it cannoe be add to diff, will show NaN
    var diff = 0, res = 0;
    for (var i = 0; i < prices.length - 1; i++) {
        diff = Math.max(0, prices[i + 1] - prices[i]);
        res += diff;
    }
    
    return res;
}
