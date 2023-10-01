
/**
 * 
 * For two strings s and t, we say "t divides s" if and only if s = t + ... + t (i.e., t is concatenated with itself one or more times).

Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

Example 1:

Input: str1 = "ABCABC", str2 = "ABC"
Output: "ABC"
Example 2:

Input: str1 = "ABABAB", str2 = "ABAB"
Output: "AB"
Example 3:

Input: str1 = "LEET", str2 = "CODE"
Output: ""
 
Constraints:

1 <= str1.length, str2.length <= 1000
str1 and str2 consist of English uppercase letters.
 */
struct Solution {}

impl Solution {
 fn gcd_of_strings(str1: String, str2: String) -> String {
    // first select the smallest string by length between str1 & str2
  // then find the factors of the smallest string
  // the factors are the possible length of the divisors of the string
  // for each factor, take the substring of that length and check if its a valid divisor of both string
  // because we starting from the largest divisor, once we find a common substring, that must be the gcd

  // Optimisation. if the strings are the same length, just check if they are the same string
  if str1.len() == str2.len() {
    if str1 == str2 {
      return str1;
    } else {
      return String::new();
    }
  }

  // Optimisation
//  str1+str2 == str2+str1 if and only if str1 and str2 have a gcd .
//  E.g. str1=abcabc, str2=abc, then str1+str2 = abcabcabc = str2+str1
//  This(str1+str2==str2+str1) is a requirement for the strings to have a gcd.
//  If one of them is NOT a common part then gcd is "".It means we will return empty string
  if str1.clone() + &str2 != str2.clone() + &str1 {
    return String::new();
  }

    // first select the smallest string by length between str1 & str2
  let smaller_str;
  let longer_str;

  if str1.len() < str1.len() {
    smaller_str = str1;
    longer_str = str2;
  } else {
    smaller_str = str2;
    longer_str = str1;
  }

  // then find the factors of the smallest string
  for i in (1..smaller_str.len()+1).rev() {
    if smaller_str.len() % i == 0 && longer_str.len() % i == 0 {
        if Solution::is_valid_divisor(&smaller_str, i) && Solution::is_valid_divisor(&longer_str, i) {
          return String::from(&smaller_str[0..i]);
        }
    }
  }

  return String::new();
}

fn is_valid_divisor (str: &String, len: usize) -> bool {

  let substring =  &str[..len];
  for i in (len..str.len()).step_by(len) {
    if substring != &str[i..i + len] {
      return false;
    }
  }
  
  return true;
}
}

/**
 * Euclidean solution
 * Approach
 * str1+str2 == str2+str1 if and only if str1 and str2 have a gcd .
 * E.g. str1=abcabc, str2=abc, then str1+str2 = abcabcabc = str2+str1
 * This(str1+str2==str2+str1) is a requirement for the strings to have a gcd. 
 * If one of them is NOT a common part then gcd is "".It means we will return empty string
 * Both the strings are made of same substring added multiple times.
 * Since they are multiples, next step is simply to find the gcd of the lengths of 2 strings 
 * e.g. gcd(6,3) = 3, (we can use gcd function to find that)and get the substring of length 3 from either str1 or str2.
 */
fn gcd_of_strings_euclidean_solution(str1: String, str2: String) -> String {
    if str1.clone() + &str2 == str2.clone() + &str1 {
        let gcd_of_length = gcd(str1.len(), str2.len());
        return String::from(&str1[0..gcd_of_length]);
    } 

    return String::new();
}
 
// efficient Recursive function to find GCD of two number using Euclidean algorithm
fn gcd(a: usize, b:usize) -> usize{
  // Everything divides 0
  if b == 0 {
    return a;
  }
   
  return gcd(b, a % b);
}

pub fn run_demo() {
   println!("Result:: {}", gcd_of_strings_euclidean_solution(String::from("ABCABC"), String::from("ABC")));
println!("Result:: {}", gcd_of_strings_euclidean_solution(String::from("ABABAB"), String::from("ABAB")));
println!("Result:: {}", gcd_of_strings_euclidean_solution(String::from("LEET"), String::from("CODE")));
println!("Result:: {}", gcd_of_strings_euclidean_solution(String::from("EEEE"), String::from("EE")));
println!("Result:: {}", gcd_of_strings_euclidean_solution(String::from("ABCDEF"), String::from("ABC")));
println!("Result:: {}", gcd_of_strings_euclidean_solution(String::from("AAAAAAAAA"), String::from("AAACCC")));
println!("Result:: {}", gcd_of_strings_euclidean_solution(String::from("AAAAAAAACCC"), String::from("AAAC")));
println!("Result:: {}", gcd_of_strings_euclidean_solution(String::from("ABABCCABAB"), String::from("ABAB")));
println!("Result:: {}", gcd_of_strings_euclidean_solution(String::from("BABABA"), String::from("ABAB")));
}