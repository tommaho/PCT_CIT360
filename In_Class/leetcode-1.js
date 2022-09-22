/**
 * https://leetcode.com/problems/two-sum/
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {

    let solutionIndexes = [];

    for (let i = 0; i < nums.length; i++) {

            for (let j = 0; j < nums.length; j++) {

                    if(nums[i] + nums[j] == target && i != j) {
                        solutionIndexes.push(i);
                        solutionIndexes.push(j);
                        return solutionIndexes;
                    }
                }
            }
};

console.log (twoSum([3, 2, 4], target = 6));