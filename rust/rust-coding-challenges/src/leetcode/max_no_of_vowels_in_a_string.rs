/**
 * Given a string s and an integer k, 
 * return the maximum number of vowel letters in any substring of s with length k.
 * 
 * Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.
 * 
 * Example 1:
 * Input: s = "abciiidef", k = 3
 * Output: 3
 * Explanation: The substring "iii" contains 3 vowel letters.
 * 
 * 
 * Example 2:
 * Input: s = "aeiou", k = 2
 * Output: 2
 * Explanation: Any substring of length 2 contains 2 vowels.
 * 
 * 
 * Example 3:
 * Input: s = "leetcode", k = 3
 * Output: 2
 * Explanation: "lee", "eet" and "ode" contain 2 vowels.
 * 
 * 
 * Constraints:
 * 1 <= s.length <= 105
 * s consists of lowercase English letters.
 * 1 <= k <= s.length
 */
use std::cmp::max;

 fn max_vowels(s: String, k: i32) -> i32 {
    let chars:Vec<char> = s.chars().collect();
    let vowels:Vec<char> = vec!['a', 'e', 'i', 'o', 'u'];
    let k_as_usize = k as usize;
    
    
    // first create a window of size k and count the number of vowels in it
    // let mut window:Vec<char> = vec![];
    let mut window_vowels_count = 0;
    for i in 0..(k_as_usize) {
        // window.push(chars[i]);
        if vowels.contains(&chars[i]) {
            window_vowels_count += 1;
        }
    }

    let mut max_vowel_count = window_vowels_count;

    // Iterate through the rest of the string, ensure to maintain the number of vowels in the window         
    for i in (k_as_usize)..chars.len() {
        let new_char = chars[i];
        let window_left_edge = chars[i-k_as_usize];

        if vowels.contains(&window_left_edge) {
            window_vowels_count -=1;
        }

        if vowels.contains(&new_char) {
            window_vowels_count +=1;
        } 

        max_vowel_count = max(window_vowels_count, max_vowel_count);
    }
    
    max_vowel_count
}

pub fn run_demo() {
    println!("{}", max_vowels(String::from("abciiidef"), 3));
    println!("{}", max_vowels(String::from("aeiou"), 2));
    println!("{}", max_vowels(String::from("leetcode"), 3));
}