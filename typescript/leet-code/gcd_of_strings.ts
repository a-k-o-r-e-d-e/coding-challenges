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

function gcdOfStrings(str1: string, str2: string): string {
  // first select the smallest string by length between str1 & str2
  // then find the factors of the smallest string
  // the factors are the possible length of the divisors of the string
  // for each factor, take the substring of that length and check if its a valid divisor of both string
  // because we starting from the largest divisor, once we find a common substring, that must be the gcd

  // Optimisation. if the strings are the same length, just check if they are the same string
  if (str1.length === str2.length) {
    if (str1 === str2) {
      return str1;
    } else {
      return "";
    }
  }

  /**
   * Optimisation
   * * str1+str2 == str2+str1 if and only if str1 and str2 have a gcd .
   * E.g. str1=abcabc, str2=abc, then str1+str2 = abcabcabc = str2+str1
   * This(str1+str2==str2+str1) is a requirement for the strings to have a gcd.
   * If one of them is NOT a common part then gcd is "".It means we will return empty string
   */
  if (str1 + str2 !== str2 + str1) {
    return "";
  }

  // first select the smallest string by length between str1 & str2
  let smallestStr, longerStr;

  if (str1.length < str1.length) {
    smallestStr = str1;
    longerStr = str2;
  } else {
    smallestStr = str2;
    longerStr = str1;
  }

  // then find the factors of the smallest string
  for (let i = smallestStr.length; i >= 1; i--) {
    if (smallestStr.length % i === 0 && longerStr.length % i === 0) {
        if (isValidDivisor(smallestStr, i) && isValidDivisor(longerStr, i)) {
          return smallestStr.substring(0, i);
        }
    }
  }

  return "";
}

const isValidDivisor = (str: string, len: number) => {
  const substring = str.substring(0, len);
  for (let i = len; i <= str.length - len; i += len) {
    if (substring !== str.substring(i, i + len)) {
      return false;
    }
  }

  return true;
};


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
function gcdOfStringsEuclideanSolution(str1: string, str2: string): string {
    if (str1+str2 ===str2+str1) {
        const gcdOfLength = gcd(str1.length, str2.length);
        return str1.substring(0, gcdOfLength);
    } 

    return "";
}
 
// efficient Recursive function to find GCD of two number using Euclidean algorithm
function gcd(a: number, b:number){
  // Everything divides 0
  if(b == 0){
    return a;
  }
   
  return gcd(b, a % b);
}

// console.log("Result:: ", gcdOfStrings("ABCABC", "ABC"));
// console.log("Result:: ", gcdOfStrings("ABABAB", "ABAB"));
// console.log("Result:: ", gcdOfStrings("LEET", "CODE"));
// console.log("Result:: ", gcdOfStrings("EEEE", "EE"));
// console.log("Result:: ", gcdOfStrings("ABCDEF", "ABC"));
// console.log("Result:: ", gcdOfStrings("AAAAAAAAA", "AAACCC"));
// console.log("Result:: ", gcdOfStrings("AAAAAAAACCC", "AAAC"));
// console.log("Result:: ", gcdOfStrings("ABABCCABAB", "ABAB"));
// console.log("Result:: ", gcdOfStrings("BABABA", "ABAB"));

// console.log(isValidDivisor("BABABA", 2));

