/**
 * Given an integer array nums and an integer k, return the kth largest element in the array.
 *
 * Note that it is the kth largest element in the sorted order, not the kth distinct element.
 * Can you solve it without sorting?
 *
 * Example 1:
 * Input: nums = [3,2,1,5,6,4], k = 2
 * Output: 5
 *
 * Example 2:
 * Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
 * Output: 4
 *
 * Constraints:
 * 1 <= k <= nums.length <= 105
 * -104 <= nums[i] <= 104
 */

 use std::collections::BinaryHeap;

fn find_kth_largest(nums: Vec<i32>, k: i32) -> i32 {
     let mut heap = BinaryHeap::with_capacity(nums.len());
     for num in nums {
        heap.push(num);
     }

     for _x in 1..k {
        heap.pop();
     }

     return heap.pop().unwrap();
}

pub fn run_demo() {
    let array_a = vec![3,2,1,5,6,4];
    let array_b = vec![3,2,3,1,2,4,5,5,6];

    println!("{}", find_kth_largest(array_a, 2));
    println!("{}", find_kth_largest(array_b, 4));
}
