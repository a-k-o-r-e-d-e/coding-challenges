use std::collections::HashMap;

/**
 Given an integer array nums and an integer k, 
 return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

Example 1:
    Input: nums = [1,2,3,1], k = 3
    Output: true

Example 2:
    Input: nums = [1,0,1,1], k = 1
    Output: true

Example 3:
    Input: nums = [1,2,3,1,2,3], k = 2
    Output: false
 
Constraints:
    1 <= nums.length <= 105
    -109 <= nums[i] <= 109
    0 <= k <= 105
 */
fn contains_nearby_duplicate(nums: Vec<i32>, k: i32) -> bool {
    let mut hash_map:HashMap<i32, i32> = HashMap::new();
    
    for (idx , num) in nums.iter().enumerate() {
                match hash_map.get_mut(&num) {
            Some(i) => {
                if i32::abs(idx as i32 - *i) as i32 <= k {
                    return true;
                } else {
                    *i = idx as i32;
                }
            },
            None => {hash_map.insert(*num, idx as i32);},
        }
    }

    false
}

pub fn run_demo() {
    println!("{}", contains_nearby_duplicate(vec![1,2,3,1], 3)); // true

    println!("{}", contains_nearby_duplicate(vec![1,0,1,1], 1)); // true

    println!("{}", contains_nearby_duplicate(vec![1,2,3,1,2,3], 2)); // false
}