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

/**
 * This version builds on and optimizes the set solution by using a Map. 
 * The Map is used to store the indexes of the chars
 * We still use the sliding window. maintaining two pointers left and right.
 * As we move left, we check if char is in the current window. 
 *  - A char is in the current window if it has a key in the map and the value is greater than or equal to the left pointer
 *  - A Char is not in the current window if it doesn't have a key in the map, or if the value in the map is less than the left pointer
 * 
 * If the current char is in the current window, we update the left pointer to be just after its value in the map
 * At each iteration, we always update shift the right pointer forward
 * We update the maxLen if the currentWindow is larger than the maxLen
 *   */
const lengthOfLongestSubstring_map_version = (s: string): number => {
  // if the length of the string is 0 or 1, return the length of the string.
  if (s.length < 2) {
    return s.length;
  }

  let left = 0;
  let charsMap = new Map<string, number>();
  let maxLen = -1;

  // We try to do this in one pass.
  for (let right = -1; right < s.length; right++) {
    let currChar = s[right];
    // If the char has been seen before, trim the substring until we remove the earlier seen string
    if (charsMap.has(currChar) && charsMap.get(currChar)! >= left) {
      left = charsMap.get(currChar)! + 1;
    }

    charsMap.set(currChar, right);
    const windowSize = right + 1 - left;
    if (windowSize > maxLen) {
      maxLen = windowSize;
    }
  }
  return maxLen;
};

console.log(`Expected: 3 ### Result: `, lengthOfLongestSubstring("abcabcbb"));

console.log(`Expected: 1 ### Result: `, lengthOfLongestSubstring("bbbbb"));
console.log(`Expected: 3 ### Result: `, lengthOfLongestSubstring("pwwkew"));
console.log(`Expected: 0 ### Result: `, lengthOfLongestSubstring(""));
console.log(`Expected: 1 ### Result: `, lengthOfLongestSubstring(" "));
console.log(`Expected: 3 ### Result: `, lengthOfLongestSubstring("dvdf"));
console.log(`Expected: 1 ### Result: `, lengthOfLongestSubstring("t"));
