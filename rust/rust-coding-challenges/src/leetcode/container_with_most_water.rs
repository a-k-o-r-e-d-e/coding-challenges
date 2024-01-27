/**
 * You are given an integer array height of length n. 
 * There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
 * Find two lines that together with the x-axis form a container, such that the container contains the most water.
 * Return the maximum amount of water a container can store.
 * 
 * Notice that you may not slant the container.
 * 
 * Example 1:
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
 * 
 * Example 2:
 * Input: height = [1,1]
 * Output: 1
 * 
 * Constraints:
 * n == height.length
 * 2 <= n <= 105
 * 0 <= height[i] <= 104
 */
use std::cmp::{min,max};

 fn max_area(height: Vec<i32>) -> i32 {
        // use two pointers to iterate through bouth ends of the array at the same time
        // always move the pointer that points to the shorter line
        // the amount of volume is given by the length and breath of the box formed by the line

        let mut left_line = 0;
        let mut right_line = height.len() -1;
        let mut max_area = i32::MIN;

        while left_line < (right_line as usize) {
            let box_breath = (right_line - left_line) as i32;
            // box length is given by the height of the shortest line
            let box_length = min(height[right_line], height[left_line]);

            let water_area = box_length * box_breath;
            // println!("Box Length: {}; Box Breadth: {}; Water amount: {}", box_length, box_breath, water_amount);

            max_area = max(water_area, max_area);

            // move the pointer that points to the shorter line
            if height[left_line] < height[right_line] {
                left_line +=1;
            } else {
                right_line -= 1;
            }
        }

        max_area
}

pub fn run_demo () {
    println!("{}", max_area(vec![1,8,6,2,5,4,8,3,7]));
    println!("{}", max_area(vec![1,1]));
}