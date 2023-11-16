/**
 * You are given a string s, which contains stars *.
 * In one operation, you can:
 * Choose a star in s.
 * Remove the closest non-star character to its left, as well as remove the star itself.
 * Return the string after all stars have been removed.
 *
 * Note:
 * The input will be generated such that the operation is always possible.
 * It can be shown that the resulting string will always be unique.
 *
 * Example 1:
 * Input: s = "leet**cod*e"
 * Output: "lecoe"
 * Explanation: Performing the removals from left to right:
 * - The closest character to the 1st star is 't' in "leet**cod*e". s becomes "lee*cod*e".
 * - The closest character to the 2nd star is 'e' in "lee*cod*e". s becomes "lecod*e".
 * - The closest character to the 3rd star is 'd' in "lecod*e". s becomes "lecoe".
 * There are no more stars, so we return "lecoe".
 *
 * Example 2:
 * Input: s = "erase*****"
 * Output: ""
 * Explanation: The entire string is removed, so we return an empty string.
 *
 * Constraints:
 * 1 <= s.length <= 105
 * s consists of lowercase English letters and stars *.
 * The operation above can be performed on s.
 */


fn remove_stars_stack_approach(s: String) -> String {
  // We use a stack and push each none star element of the string into the stack
  // when we encounter a star, we simply pop the top of the star as that is assured to be the closest none star element
  let mut stack = Vec::new();

  for v in s.chars() {
    if v == '*' {
        stack.pop();
    } else {
        stack.push(v.clone());
    }
}

    stack.iter().collect()
}

fn remove_stars_2_pointer_approach(s: String) -> String {
  // Approach
    // Use two pointers technique. 
    // One keeps track of position in original string, 
    // and the other keeps track of position in the resulting string.
    // As we scan through the original string, 
    // if we encounter a star, we move the resulting string pointer one step back. effectively deleting the leftmost non star character
    // If it is a regular character, we copy it to the resulting string.
  let mut chars:Vec<char> = s.chars().collect();
  let mut writer:usize = 0;

  for seeker in 0..s.len() { 
    if chars[seeker] == '*' {
        writer -= 1;
    } else {
        chars[writer] = chars[seeker];
        writer += 1;
    }
}

    chars[0..writer].iter().collect()
}

pub fn run_demo() {
    println!("Stack approach solutions");
    println!("Result:: {}", remove_stars_stack_approach(String::from("leet**cod*e")));
    println!("Result:: {}", remove_stars_stack_approach(String::from("erase*****")));
    println!("Result:: {}", remove_stars_stack_approach(String::from("*****")));
    println!("Result:: {}", remove_stars_stack_approach(String::from("erase")));
    println!("Result:: {}", remove_stars_stack_approach(String::from("")));

    println!("\n\n2 Pointers approach solutions");
    println!("Result:: {}", remove_stars_2_pointer_approach(String::from("leet**cod*e")));
    println!("Result:: {}", remove_stars_2_pointer_approach(String::from("erase*****")));
    println!("Result:: {}", remove_stars_2_pointer_approach(String::from("erase")));
    println!("Result:: {}", remove_stars_2_pointer_approach(String::from("")));
}