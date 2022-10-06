use std::collections::HashSet;

/**
 * Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.

 

Example 1:

Input: nums = [1,2,3,1]
Output: true
Example 2:

Input: nums = [1,2,3,4]
Output: false
Example 3:

Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
 

Constraints:

1 <= nums.length <= 105
-109 <= nums[i] <= 109
*/

fn contains_duplicate(nums: Vec<i32>) -> bool {
    let mut hash_set:HashSet<i32> = HashSet::new();
    for num in nums {
        if  hash_set.contains(&num) {
            return  true;
        }
        hash_set.insert(num);
    }        

    return false;
}

pub fn run_demo () {
    let nums = vec![1,2,3,1];
    println!("{}", contains_duplicate(nums)); // true

    let nums = vec![1,2,3,4];
    println!("{}", contains_duplicate(nums)); // false

    let nums = vec![1,1,1,3,3,4,3,2,4,2];
    println!("{}", contains_duplicate(nums)); // true
}