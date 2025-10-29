/**
 * Given a string s, find the length of the longest substring without duplicate characters.

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
 */

function lengthOfLongestSubstring(s: string): number {
  let windowStart = -1;
  let windowEnd = 0;
  let seenChars = new Set();
  let maxLen = -1;

  // if the length of the string is 0 or 1, return the length of the string.
  if (s.length < 2) {
    return s.length;
  }

  // We try to do this in one pass.
  for (let i = 0; i < s.length; i++) {
    let currChar = s[i];
    // If the char has been seen before, trim the substring until we remove the earlier seen string
    if (seenChars.has(currChar)) {
      while (s[windowEnd] !== currChar) {
        seenChars.delete(s[windowEnd]); // remove char from seen chars (It is assumed each char is only seen once.)
        windowEnd++; // shift window end
      }

      seenChars.delete(s[windowEnd]);
      windowEnd++;
    }

    windowStart++; // shift window start forward
    seenChars.add(currChar);
    const windowSize = windowStart + 1 - windowEnd;
    if (windowSize > maxLen) {
      maxLen = windowSize;
    }
  }
  return maxLen;
}

