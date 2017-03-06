475. Heaters

Winter is coming! Your first job during the contest is to design a standard heater with fixed warm radius to warm all the houses.

Now, you are given positions of houses and heaters on a horizontal line, find out minimum radius of heaters so that all houses could be covered by those heaters.

So, your input will be the positions of houses and heaters seperately, and your expected output will be the minimum radius standard of heaters.

Note:
Numbers of houses and heaters you are given are non-negative and will not exceed 25000.
Positions of houses and heaters you are given are non-negative and will not exceed 10^9.
As long as a house is in the heaters' warm radius range, it can be warmed.
All the heaters follow your radius standard and the warm radius will the same.
Example 1:
Input: [1,2,3],[2]
Output: 1
Explanation: The only heater was placed in the position 2, and if we use the radius 1 standard, then all the houses can be warmed.
Example 2:
Input: [1,2,3,4],[1,4]
Output: 1
Explanation: The two heater was placed in the position 1 and 4. We need to use radius 1 standard, then all the houses can be warmed.
Hide Company Tags Google
Hide Tags Binary Search

// Based on 2 pointers, the idea is to find the nearest heater for each house, by comparing the next heater with the current heater

// heaters[i] + heaters[i + 1] <= house * 2
// is checking if house is closer to heaters[i] or heaters[i + 1]

// The following same function is checking if house is less than half of the two heaters
// If it is less than half, it is closer to the heaters[i] and vice versa
// (heaters[i] + heaters[i + 1]) / 2 <= house

// For example,
// heaters[i] is at 2 while heaters[i+1] is at 6. half of 2 and 6 is 4. If house is less than 4 then it is closer to heaters[i] but if it is larger than 4, then it is closer to heaters[i+1]
/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
// O(n) n is the number of houses
// sort both arrays, go over houses, find the neaster heater for it, get distance, update res.
var findRadius = function(houses, heaters) {
    let res = 0, i = 0;
    heaters = heaters.sort( (a, b) => {
        return a - b;
    });
    houses = houses.sort( (a, b) => {
        return a - b;
    });
    houses.forEach(house => {
        while (i < heaters.length - 1 && heaters[i] + heaters[i + 1] <= house * 2) {
            i++;
        }
        res = Math.max(res, Math.abs(house - heaters[i]));
    });
    return res;
};
