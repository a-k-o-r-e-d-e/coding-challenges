use std::collections::HashSet;
/**
 * Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

 

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.
 

Constraints:

1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000
*/
fn intersection(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
    let mut hash_set = HashSet::new();

    for val in nums1 {
        hash_set.insert(val);
    }        
    let mut res_hs = HashSet::new();
    for val in nums2 {
        if hash_set.contains(&val) {
            res_hs.insert(val);
        }
    }

    Vec::from_iter(res_hs)
}

pub fn run_demo () {
    let ans = intersection(vec![1,2,2,1], vec![2,2]);
    println!("{:?}", ans);

    let ans = intersection(vec![4,9,5], vec![9,4,9,8,4]);
    println!("{:?}", ans);
}