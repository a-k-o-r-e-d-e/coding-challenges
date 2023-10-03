
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

fn move_zeroes(nums: &mut Vec<i32>) {
    /*
     * Approach
     * we loop through the array and keep track of zeroesSection
     * when we find a zero number , we increment the size of the zeroesSection
     * when we find a non zero number
     * we swap with the tail of the zeroesSection with the nonzero number and move the zeroesSection
     */

    let mut zeroes_section_size = 0;

    for i in 0..nums.len() {
        if nums[i] == 0 {
            zeroes_section_size +=1;
        } else if zeroes_section_size > 0 {
            let temp = nums[i];
            let zeroes_tail = i - zeroes_section_size;
            nums[i] = 0;
            nums[zeroes_tail] = temp;
        }
    }

    println!("{:?}", nums)
}

pub fn run_demo() {
   move_zeroes(Vec::from([0, 1, 0, 3, 12]).as_mut());
move_zeroes(Vec::from([8,0,1,0,4,0,12,0,9]).as_mut());
move_zeroes(Vec::from([0]).as_mut());
move_zeroes(Vec::from([1,5,6]).as_mut());
move_zeroes(Vec::from([3,8,6,0,0,0]).as_mut());
move_zeroes(Vec::from([9,0,1,4,0,12,0,9]).as_mut())
}