/**
 * Given a string s, return the longest palindromic substring in s.
 * 
 * Example 1:
 * Input: s = "babad"
 * Output: "bab"
 * Explanation: "aba" is also a valid answer.
 * 
 * Example 2:
 * Input: s = "cbbd"
 * Output: "bb"
 * 
 * Constraints:
 * 1 <= s.length <= 1000
 * s consist of only digits and English letters.
 * 
 */

function longestPalindrome_bruteforce(s: string): string {
  if (s.length === 1) {
    return s;
  }

  let longestSubStrPalindrome = "";

  for (let winSize = s.length; winSize >= 1; winSize--) {
    let left = 0;
    let right = winSize - 1;

    while (right < s.length) {
      if (isPalindrome(s, left, right)) {
        // return substr
        longestSubStrPalindrome = s.substring(left, right + 1);
        return longestSubStrPalindrome;
      }

      left += 1;
      right += 1;
    }
  }

  return longestSubStrPalindrome;
}

function isPalindrome(s: string, left: number, right: number): boolean {
  if (left >= right) {
    return true;
  }

  if (s[left] !== s[right]) {
    return false;
  }

  return isPalindrome(s, left + 1, right - 1);
}


function longestPalindrome_expandFromCenter(s: string): string {
  if (s.length <= 1) {
    return s;
  }

  let maxStr = s[0];

  for (let i = 0; i < s.length - 1; i++) {
    const odd = expandFromCenter(s, i, i);
    const even = expandFromCenter(s, i, i + 1);

    if (odd.length > maxStr.length) {
      maxStr = odd;
    }

    if (even.length > maxStr.length) {
      maxStr = even;
    }
  }

  return maxStr;
}

function expandFromCenter(s: string, left: number, right: number): string {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left -= 1;
    right += 1;
  }
  return s.substring(left + 1, right);
}