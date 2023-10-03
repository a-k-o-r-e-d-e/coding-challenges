/**
 * Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
 * Note that you must do this in-place without making a copy of the array.
 * 
 * Example 1:
 * Input: nums = [0,1,0,3,12]
 * Output: [1,3,12,0,0]
 * 
 * Example 2:
 * Input: nums = [0]
 * Output: [0]
 * 
 * Constraints:
 * 1 <= nums.length <= 104
 * -231 <= nums[i] <= 231 - 1
 * 
 */

/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
    /**
     * Approach
     * we loop through the array and keep track of zeroesSection
     * when we find a zero number , we increment the size of the zeroesSection
     * when we find a non zero number
     * we swap with the tail of the zeroesSection with the nonzero number and move the zeroesSection
     */
    let zeroesSectionSize = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 0) {
            zeroesSectionSize ++;
        } else if (zeroesSectionSize > 0)  {
            // swap non-zero number with tail of zeroes
            const temp = nums[i];
            const zeroesTail = i - zeroesSectionSize;
            nums[i] = 0;
            nums[zeroesTail] = temp;
        }
    }
    console.log(nums)
};

moveZeroes([0, 1, 0, 3, 12]);
moveZeroes([8,0,1,0,4,0,12,0,9]);
moveZeroes([0]);
moveZeroes([1,5,6]);
moveZeroes([3,8,6,0,0,0]);
moveZeroes([9,0,1,4,0,12,0,9])