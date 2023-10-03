/**
 * You are given an integer array nums consisting of n elements, and an integer k.
 * Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value.
 * Any answer with a calculation error less than 10-5 will be accepted.
 *
 * Example 1:
 * Input: nums = [1,12,-5,-6,50,3], k = 4
 * Output: 12.75000
 * Explanation:
 * Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
 *
 * Example 2:
 * Input: nums = [5], k = 1
 * Output: 5.00000
 *
 * Constraints:
 * n == nums.length
 * 1 <= k <= n <= 105
 * -104 <= nums[i] <= 104
 */

fn find_max_average(nums: Vec<i32>, k: i32) -> f64 {
 // Approach
  // First acquire the sum of the first k numbers
  // this is the initial max sum
  // from there iterate to the end of the array, adding and deleting from the sliding window as you move.
  // check the sum at each iteration, and update the max sum as necessary
  // the max average is the maxSum / k

  let mut sum = 0;
  let range = k as usize;

  for i in 0..range {
    sum += nums[i];
  }

  let mut max_sum = sum;

  // now we iterate from the k to the end of the array
  for i in range..nums.len() {
    sum = sum - nums[i-range] + nums[i]; 
    if sum > max_sum {
        max_sum = sum;
    }
  } 

  return  (max_sum as f64)/(k as f64);      
}


pub fn run_demo() {
    println!("{}", find_max_average(Vec::from([1, 12, -5, -6, 50, 3]), 4));
    println!("{}", find_max_average(Vec::from([5]), 1));
}