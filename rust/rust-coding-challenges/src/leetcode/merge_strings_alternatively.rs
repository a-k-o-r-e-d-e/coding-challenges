use std::cmp::max;

/**
 * LeetCode Problem: https://leetcode.com/problems/merge-strings-alternately
 * You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.
 * Return the merged string.
 * 
 * Example 1:

Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Explanation: The merged string will be merged as so:
word1:  a   b   c
word2:    p   q   r
merged: a p b q c r
Example 2:

Input: word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Explanation: Notice that as word2 is longer, "rs" is appended to the end.
word1:  a   b 
word2:    p   q   r   s
merged: a p b q   r   s
Example 3:

Input: word1 = "abcd", word2 = "pq"
Output: "apbqcd"
Explanation: Notice that as word1 is longer, "cd" is appended to the end.
word1:  a   b   c   d
word2:    p   q 
merged: a p b q c   d
 

Constraints:

1 <= word1.length, word2.length <= 100
word1 and word2 consist of lowercase English letters.
 */

pub fn merge_alternately(word1: String, word2: String) -> String {
    let len = max(word1.len(), word2.len());

    let mut ans = String::new();

    for i in 0..len {
        if i < word1.len() {
            ans.push_str(&word1[i..i+1]);
        }

        if i < word2.len() {
            ans.push_str(&word2[i..i+1])
        }
    }

    // println!("Answer:: {}", ans);

    return ans;
}

pub fn run_demo() {
    println!("{}", merge_alternately(String::from("abc"), String::from("pqr")));
    println!("{}", merge_alternately(String::from("ab"), String::from("pqrs")));
    println!("{}", merge_alternately(String::from("abcd"), String::from("pq")));
    println!("{}", merge_alternately(String::from("a"), String::from("pqrs")));
    println!("{}", merge_alternately(String::from("abcd"), String::from("q")));
    println!("{}", merge_alternately(String::from("a"), String::from("p")));
}
