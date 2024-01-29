/**
 * Given an array of integers arr, return true if the number of occurrences of each value in the array is unique or false otherwise.
 *
 * Example 1:
 * Input: arr = [1,2,2,1,1,3]
 * Output: true
 * Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.
 *
 *
 * Example 2:
 * Input: arr = [1,2]
 * Output: false
 *
 *
 * Example 3:
 * Input: arr = [-3,0,1,-3,1,1,1,-3,10,0]
 * Output: true
 *
 *
 * Constraints:
 * 1 <= arr.length <= 1000
 * -1000 <= arr[i] <= 1000
 */
use std::collections::{HashSet, HashMap};

fn unique_occurrences(arr: Vec<i32>) -> bool {
    // Iterate through the array
    // counting the occurences of each element and storing it in the hash set
    // Once the occurences has been computed.
    // Iterate through the hashmap and use the hashset to determine if a occurence count has been seen before
    // if you encounter an occurence that has been seen before, return false
    // if not return true;
    let mut hash_set:HashSet<usize> = HashSet::new();
    let mut hash_map:HashMap<i32, usize> = HashMap::with_capacity(arr.len());

    for num in arr {
        match hash_map.get_mut(&num) {
            Some(count) => *count += 1,
            None => {hash_map.insert(num, 1);}
        }
    }

    for occurence in hash_map.values() {
        if hash_set.contains(occurence) {
            return false;
        }

        hash_set.insert(occurence.clone());
    }

    return true;
}

pub fn run_demo() {
    println!("{}", unique_occurrences(vec![1,2,2,1,1,3]));
    println!("{}", unique_occurrences(vec![1,2]));
    println!("{}", unique_occurrences(vec![-3,0,1,-3,1,1,1,-3,10,0]));
}
