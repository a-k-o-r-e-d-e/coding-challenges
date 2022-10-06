use std::collections::HashSet;

/**
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
 * You must implement a solution with a linear runtime complexity and use only constant extra space.
Example 1:
    Input: nums = [2,2,1]
    Output: 1

Example 2:
    Input: nums = [4,1,2,1,2]
    Output: 4

Example 3:
    Input: nums = [1]
    Output: 1


Constraints:
    1 <= nums.length <= 3 * 104
    -3 * 104 <= nums[i] <= 3 * 104
    Each element in the array appears twice except for one element which appears only once.
 */
fn single_number_using_xor(nums: Vec<i32>) -> i32 {
    let mut xor_result = 0;
    for num in nums {
        xor_result ^= num;
    }

    return  xor_result;
}

fn single_number_using_set(mut nums: Vec<i32>) -> i32 {
    nums.sort();
    let mut hash_set = HashSet::new();
    for num in nums {
        match  hash_set.get(&num) { 
            None => hash_set.insert(num),
            Some(_) => hash_set.remove(&num)
        };
    }
    
    let arr = Vec::from_iter(hash_set);
    return (&arr[0]).clone();
}

pub fn run_demo () {
    println!("{}", single_number_using_xor(vec![2,2,1])); // 1
    println!("{}", single_number_using_xor(vec![4,1,2,1,2])); // 4
    println!("{}", single_number_using_xor(vec![1])); // 1
    println!();
    println!("{}", single_number_using_set(vec![2,2,1])); // 1
    println!("{}", single_number_using_set(vec![4,1,2,1,2])); // 4
    println!("{}", single_number_using_set(vec![1])); // 1
}