16. 3Sum Closest

Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

    For example, given array S = {-1 2 1 -4}, and target = 1.

    The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
Hide Company Tags Bloomberg
Hide Tags Array Two Pointers
Hide Similar Problems (M) 3Sum (M) 3Sum Smaller

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// sort, for 一遍，对每个数，把后面的剩下的数做two pointers，找b+c=-a!!!
// there might be duplicates!!!
// 记下closest，diff < closest, update closest and result = current sum.
var threeSumClosest = function(nums, target) {
    if (nums === null || nums.length < 3) {
        return null;
    }
    
    // sort first
    let sortedNums = nums.sort((a, b) => {
        return a - b;
    });
    
    // i only needs to go to nums.length - 3
    let closest = Infinity;
    let result;

    for (let i = 0; i < sortedNums.length - 2; i++) {
        // skip duplicate triples with the same first numebr
        if (i > 0 && sortedNums[i] === sortedNums[i - 1]) {
            continue;
        }
        let left = i + 1, right = sortedNums.length - 1;
        
        // javascript async, put the function in the big function
        // two pointers
        while (left < right) {
            let sum = sortedNums[i] + sortedNums[left] + sortedNums[right];
            let diff = Infinity;
            if (sum === target) {
                closest = 0;
                result = sum;
                return result; 
            } else if (sum < target) {
                diff = target - sum;
                left++;
            } else {
                diff = sum - target;
                right--;
            }
            if (diff < closest) {
                closest = diff;
                console.log(closest);
                result = sum;
            }
        }

    }
    return result;
};

// var threeSumClosest = function(nums, target) {
//     if(nums === null || nums.length < 2){
//         return null;
//     }
    
//     if(nums.length === 3){
//         return nums.reduce(function(prev,cur){return prev + cur;});
//     }

//     var result = 0;
//     var closest = Infinity;

//     nums.sort(function(a,b){return a > b ? 1 : -1;});
    
//     for(var i = 0; i < nums.length; i++){
//         var j = i + 1;
//         var k = nums.length - 1;
//         while(j < k){
//             var sum = nums[j] + nums[k] + nums[i];
//             var diff = sum - target;
            
//             if(diff === 0){
//                 return sum;
//             }
            
//             if(sum < target){
//                 diff = target - sum;
//                 j++;
//             } else {
//                 diff = sum - target;
//                 k--
//             }
            
//             if(diff < closest){
//                 closest = diff;
//                 result = sum;
//             }
//         }
        
//         while(i < (nums.length-1) && nums[i] === nums[i+1]) i++;
//     }
    
//     return result;
// };
