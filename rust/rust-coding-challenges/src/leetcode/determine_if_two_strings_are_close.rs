/**
 * Two strings are considered close if you can attain one from the other using the following operations:
 *
 * Operation 1: Swap any two existing characters.
 * For example, abcde -> aecdb
 * Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
 * For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
 * You can use the operations on either string as many times as necessary.
 * Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.
 *
 *
 * Example 1:
 * Input: word1 = "abc", word2 = "bca"
 * Output: true
 * Explanation: You can attain word2 from word1 in 2 operations.
 * Apply Operation 1: "abc" -> "acb"
 * Apply Operation 1: "acb" -> "bca"
 *
 *
 * Example 2:
 * Input: word1 = "a", word2 = "aa"
 * Output: false
 * Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.
 *
 *
 * Example 3:
 * Input: word1 = "cabbba", word2 = "abbccc"
 * Output: true
 * Explanation: You can attain word2 from word1 in 3 operations.
 * Apply Operation 1: "cabbba" -> "caabbb"
 * Apply Operation 2: "caabbb" -> "baaccc"
 * Apply Operation 2: "baaccc" -> "abbccc"
 *
 *
 * Constraints:
 * 1 <= word1.length, word2.length <= 105
 * word1 and word2 contain only lowercase English letters.
 */
use std::iter::zip;

fn close_strings(word1: String, word2: String) -> bool {
    // The major assumption we are going to make are
    // 1. Close strings must have the same length
    // 2. Close Strings must be made of the same constituent characters
    // 3. The frequencies are similar. 
    // 4. if there a char with freq x in word1, there must be another char with freq x in word2

    if word1.len() != word2.len() {
        return false;
    }

    let mut word1_char_count = vec![0; 26];
    let mut word2_char_count = vec![0; 26];

    for (char1, char2) in zip(word1.chars(), word2.chars()) {
        word1_char_count[char1.to_ascii_lowercase() as usize -97] += 1;
        word2_char_count[char2.to_ascii_lowercase() as usize -97] += 1;
    }

    for i in 0..26 {
        if (word1_char_count[i] != 0) != (word2_char_count[i] != 0) {
            return  false;
        }
    }

    word1_char_count.sort_unstable();
    word2_char_count.sort_unstable();

    for i in 0..26 {
            if word1_char_count[i] != word2_char_count[i] {
                return false;
            }
        }

    return  true;
}

pub fn run_demo() {
    // println!("{}", close_strings(String::from("abc"), String::from("bca")));
    // println!("{}", close_strings(String::from("a"), String::from("aa")));
    // println!("{}", close_strings(String::from("cabbba"), String::from("abbccc")));
    // println!("{}", close_strings(String::from("abbzzca"), String::from("babzzcz")));
    // println!("{}", close_strings(String::from("aabbcccddd"), String::from("abccccdddd")));
    println!("{}", close_strings(String::from("mkmczky"), String::from("cckcmmy")));
    // println!("{}", close_strings(String::from("xxxxxxxxxxxxxxxxxxx"), String::from("zzzzzzzzzzzzzzzzzzz")));
}
