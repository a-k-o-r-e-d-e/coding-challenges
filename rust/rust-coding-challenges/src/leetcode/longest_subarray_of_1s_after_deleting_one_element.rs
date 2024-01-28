/**
 * Given a binary array nums, you should delete one element from it.
 *
 *
 * Return the size of the longest non-empty subarray containing only 1's in the resulting array.
 * Return 0 if there is no such subarray.
 *
 * Example 1:
 * Input: nums = [1,1,0,1]
 * Output: 3
 * Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.
 *
 *
 * Example 2:
 * Input: nums = [0,1,1,1,0,1,1,0,1]
 * Output: 5
 * Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].
 *
 *
 * Example 3:
 * Input: nums = [1,1,1]
 * Output: 2
 * Explanation: You must delete one element.
 *
 * Constraints:
 * 1 <= nums.length <= 105
 * nums[i] is either 0 or 1.
 */
use std::cmp::max;

fn longest_subarray(nums: Vec<i32>) -> i32 {
    // Using a Sliding window.
    // we keep track of the position of the last 0 we saw
    // we also keep track of the number of ones in the sliding window.
    // when we encounter a 0,  updatw the number of consequtive 1s .
    // when we encounter a 1, we simply increment the count.
    // return the max count.

    let mut max_consequtive_1s_count = i32::MIN;
    let mut consequtive_1s_count= 0;
    let mut last_zero_index:i32 = -1;

    for (idx, val) in nums.iter().enumerate() {
        if val == &1 {
            consequtive_1s_count += 1;
            continue;
        } else {
            max_consequtive_1s_count = max(max_consequtive_1s_count, consequtive_1s_count);
            if !(last_zero_index < 0) {
                consequtive_1s_count = (idx as i32) - last_zero_index - 1;
            }

            last_zero_index = idx as i32;
        }
    }
    max_consequtive_1s_count = max(max_consequtive_1s_count, consequtive_1s_count);

    if max_consequtive_1s_count == nums.len() as i32 {
        return  max_consequtive_1s_count -1;
    }

    return max_consequtive_1s_count;
}

pub fn run_demo() {
    println!("{}", longest_subarray(vec![1,1,0,1]));
    println!("{}", longest_subarray(vec![0,1,1,1,0,1,1,0,1]));
    println!("{}", longest_subarray(vec![1,1,1]));
}
