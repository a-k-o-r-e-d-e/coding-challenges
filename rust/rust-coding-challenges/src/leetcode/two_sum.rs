use std::collections::HashMap;

/**
 * Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
    Input: nums = [2,7,11,15], target = 9
    Output: [0,1]
    Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
    Input: nums = [3,2,4], target = 6
    Output: [1,2]

Example 3:
    Input: nums = [3,3], target = 6
    Output: [0,1]


Constraints:
    2 <= nums.length <= 104
    -109 <= nums[i] <= 109
    -109 <= target <= 109
    Only one valid answer exists.

Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?
*/
fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    let mut hash_map:HashMap<i32, usize> = HashMap::new();
    for (idx, val) in nums.iter().enumerate() {
        let temp = target - val;
        if hash_map.contains_key(&temp) {
            return vec![*hash_map.get(&temp).unwrap() as i32, idx as i32];
        } else {
            hash_map.insert(*val, idx);
        }
    }

    return  vec![];
}

pub fn run_demo () {
    println!("{:?}", two_sum(vec![2,7,11,15], 9)); // [0,1]
    println!("{:?}", two_sum(vec![3,2,4], 6)); // [1,2]
    println!("{:?}", two_sum(vec![3,3], 6)); // [0, 1]
}