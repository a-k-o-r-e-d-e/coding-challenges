use std::collections::HashMap;

/**
 * Given a string s, find the first non-repeating character in it and return its index.
 *  If it does not exist, return -1.

Example 1:
    Input: s = "leetcode"
    Output: 0

Example 2:
    Input: s = "loveleetcode"
    Output: 2

Example 3:
    Input: s = "aabb"
    Output: -1

Constraints:
    1 <= s.length <= 105
    s consists of only lowercase English letters.
 */
fn first_uniq_char(s: String) -> i32 {
    let mut hash_map: HashMap<char, Record> = HashMap::new();
    for (idx, ch) in s.chars().enumerate() {
        let counter = hash_map.entry(ch).or_insert(Record::new(idx));
        counter.increment();
    }

    let x = hash_map.values().min_by_key(|x| {
        return  if x.count == 1 { x.idx} else {i32::MAX};
    });
    match x {
        Some(v) if v.count == 1 => v.idx,
        _ => -1,
    }
}

struct Record {
    idx: i32,
    count: i32,
}

impl Record {
    fn new(idx: usize) -> Self {
        Record {
            idx: idx as i32,
            count: 0,
        }
    }

    fn increment(&mut self) {
        self.count += 1;
    }
}


pub fn run_demo () {
    println!("{}", first_uniq_char(String::from("leetcode"))); // 0
    println!("{}", first_uniq_char(String::from("loveleetcode"))); // 2
    println!("{}", first_uniq_char(String::from("aabb"))); // -1
}