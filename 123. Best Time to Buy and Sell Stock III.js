// 123. Best Time to Buy and Sell Stock III

// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete at most two transactions.

// Note:
// You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

思路：Best Time to Buy and Sell Stock III

III是这三题中最难的。允许两次买卖，但同一时间只允许持有一支股票。
也就意味着这两次买卖在时间跨度上不能有重叠（当然第一次的卖出时间和第二次的买入时间可以是同一天）。
既然不能有重叠可以将整个序列以任意坐标i为分割点，分割成两部分：

prices[0:n-1] => prices[0:i] + prices[i:n-1]

对于这个特定分割来说，最大收益为两段的最大收益之和。
每一段的最大收益当然可以用I的解法来做。
而III的解一定是对所有0<=i<=n-1的分割的最大收益中取一个最大值。
为了增加计算效率，考虑采用dp来做bookkeeping。目标是对每个坐标i：

1. 计算A[0:i]的收益最大值：用minPrice记录i左边的最低价格，用maxLeftProfit记录左侧最大收益
2. 计算A[i:n-1]的收益最大值：用maxPrices记录i右边的最高价格，用maxRightProfit记录右侧最大收益。
3. 最后这两个收益之和便是以i为分割的最大收益。将序列从左向右扫一遍可以获取1，从右向左扫一遍可以获取2。相加后取最大值即为答案。

/**
 * @param {number[]} prices
 * @return {number}
 */
// var maxProfit = function(prices) {
//     if (prices === null || prices.length === 0) {
//         return 0;
//     }
    
//     var min = prices[0], max = -Infinity, results = [0, 0], newResult = 0;
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
//         // should compare three of them together, in case overwrites [2, 0] to [5, 0], should be [2, 5]
//         // if newResult is greater than either one of results, overwrite it
//         if (newResult > Math.min(results[0], results[1])) {
//             results[results[0] > results[1] ? 1 : 0] = newResult;
//         }
//     }
    
//     if (i === prices.length - 1 && prices[i] > prices[i - 1]) {
//         // not - prices[i - 1], but min, because prices[i] might not be the minimum number in the round
//         newResult = prices[i] - min;
//         if (newResult > Math.min(results[0], results[1])) {
//             results[results[0] > results[1] ? 1 : 0] = newResult;
//         }
//     }
//     return results[0] + results[1];
// };

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // Calculate MaxProfit from 0 to x and MaxProfit from x + 1 to len - 1;
    var profitFromZeroToX = [];
    var profitFromXToEnd = [];
    var min = prices[0];

    // get max profit from 0 to x
    for(var x = 1; x < prices.length; x++) {
        var price = prices[x];
        min = Math.min(price, min);
        profitFromZeroToX[x] = Math.max(profitFromZeroToX[x - 1] || 0, price - min);
    }
    // get max profit from i + 1 to end
    var max = prices[prices.length - 1];
    for(x = prices.length - 2; x >= 0; x--) {
        price = prices[x];
        max = Math.max(price, max);
        profitFromXToEnd[x] = Math.max(profitFromXToEnd[x + 1] || 0, max - price);
    }
    
    var maxProfit = 0;
    for(x = 0; x < prices.length; x++) {
        var maxProfitSeperateAtX = (profitFromZeroToX[x] || 0) + (profitFromXToEnd[x] || 0);
        maxProfit = Math.max(maxProfitSeperateAtX, maxProfit);
    }
    
    return maxProfit;
};
