use std::collections::HashMap;

/**
 * Given two integer arrays nums1 and nums2, return an array of their intersection. 
 * Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.
 

Example 1:
    Input: nums1 = [1,2,2,1], nums2 = [2,2]
    Output: [2,2]

Example 2:
    Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
    Output: [4,9]
    Explanation: [9,4] is also accepted.
 

Constraints:
    1 <= nums1.length, nums2.length <= 1000
    0 <= nums1[i], nums2[i] <= 1000
 

Follow up:
    What if the given array is already sorted? How would you optimize your algorithm?
    What if nums1's size is small compared to nums2's size? Which algorithm is better?
    What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?
*/
fn intersect(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
    let mut hash_map:HashMap<i32, i32> = HashMap::new();

    for num in nums1 {
        let counter = hash_map.entry(num).or_insert(0);
        *counter += 1;
    }
    let mut result = Vec::new();
    for num in nums2 {
        match hash_map.get_mut(&num) {
            Some(count) if *count >0  => {
                result.push(num);
            *count -= 1;
            },
            _ => continue
        }
    }

    return result;
}

pub fn run_demo () {
    let ans = intersect(vec![1,2,2,1], vec![2,2]);
    println!("{:?}", ans); // [2,2]

    let ans = intersect(vec![4,5,9], vec![9,4,9,8,4]);
    println!("{:?}", ans); // [4, 9] or [9,4]
}