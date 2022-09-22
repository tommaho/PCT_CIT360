//https://leetcode.com/problems/remove-duplicates-from-sorted-array/
/*
WIP, not yet submitted
 */
let nums = [0,0,1,1,1,2,2,3,3,4];
//expeted 5, nums = [0,1,2,3,4,_,_,_,_,_]

var removeDuplicates = function(nums) {
    let j = 0;

    for (let i = 0; i < nums.length; i++) {

        if(nums[i] === nums[i+1]){

            nums[i] = nums[j];

            j += 2;

        } else {
            j += 1;
        }



    }
    return nums;
};

console.log(removeDuplicates(nums));