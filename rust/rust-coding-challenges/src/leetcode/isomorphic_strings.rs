use std::collections::HashMap;

/**
 * Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.
All occurrences of a character must be replaced with another character while preserving the order of characters.
No two characters may map to the same character, but a character may map to itself.

Example 1:
    Input: s = "egg", t = "add"
    Output: true

Example 2:
    Input: s = "foo", t = "bar"
    Output: false

Example 3:
    Input: s = "paper", t = "title"
    Output: true


Constraints:
    1 <= s.length <= 5 * 104
    t.length == s.length
    s and t consist of any valid ascii character.
 */
fn is_isomorphic(s: String, t: String) -> bool {
    let (mut s_hash_map, mut t_hash_map) = (HashMap::new(), HashMap::new());

    for (s_char, t_char) in s.chars().zip(t.chars()) {
        let s_mapped = s_hash_map.entry(s_char).or_insert(t_char);
        let t_mapped = t_hash_map.entry(t_char).or_insert(s_char);
        if *s_mapped != t_char || *t_mapped != s_char {
            return false;
        }
    }

    return true;
}

pub fn run_demo() {
    println!(
        "{}",
        is_isomorphic(String::from("egg"), String::from("add"))
    ); // true
    println!(
        "{}",
        is_isomorphic(String::from("foo"), String::from("bar"))
    ); // false
    println!(
        "{}",
        is_isomorphic(String::from("paper"), String::from("title"))
    ); // true
    println!(
        "{}",
        is_isomorphic(String::from("badc"), String::from("baba"))
    ); // false
}
