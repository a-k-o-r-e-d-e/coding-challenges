use std::collections::HashMap;

/**
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:
    Input: strs = ["eat","tea","tan","ate","nat","bat"]
    Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
    Input: strs = [""]
    Output: [[""]]

Example 3:
    Input: strs = ["a"]
    Output: [["a"]]


Constraints:
    1 <= strs.length <= 104
    0 <= strs[i].length <= 100
    strs[i] consists of lowercase English letters.

*/
fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {
    let mut map: HashMap<[u8; 26], Vec<String>> = HashMap::new();

    for s in strs {
        let mut chars = [0u8; 26];
            for c in s.chars() {
                let index = c as u8 - 'a' as u8;
                chars[index as usize] += 1;
            }
        map.entry(chars).or_insert(vec![]).push(s);
    }
    map.into_values().collect()
}

pub fn run_demo() {
    // [["bat"],["nat","tan"],["ate","eat","tea"]]
    let ans = group_anagrams(vec![
        String::from("eat"),
        String::from("tea"),
        String::from("tan"),
        String::from("ate"),
        String::from("nat"),
        String::from("bat"),
    ]);
    println!("{:?}", ans); 

    // [[""]]
    let ans = group_anagrams(vec![
        String::from("")
    ]);
    println!("{:?}", ans); 

     // [["a"]]
    let ans = group_anagrams(vec![
        String::from("a")
    ]);
    println!("{:?}", ans);
}
