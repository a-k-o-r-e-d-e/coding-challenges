/**
 * Given two strings ransomNote and magazine, 
 * return true if ransomNote can be constructed by using the letters from magazine and false otherwise.
 * Each letter in magazine can only be used once in ransomNote.
 * 
 * Example 1:
 *    Input: ransomNote = "a", magazine = "b"
 *    Output: false
 * 
 * Example 2:
 *    Input: ransomNote = "aa", magazine = "ab"
 *    Output: false
 * 
 * Example 3:
 *    Input: ransomNote = "aa", magazine = "aab"
 *    Output: true
 * 
 * Constraints:
 *    1 <= ransomNote.length, magazine.length <= 105
 *    ransomNote and magazine consist of lowercase English letters.
 * 
*/


function canConstruct(ransomNote: string, magazine: string): boolean {
  let tokens: { [x: string]: number } = {};

  const magazineLen = magazine.length;
  const ransomNoteLen = ransomNote.length;
  // handle edge cases
  if (magazineLen < ransomNoteLen) {
    return false;
  }

  if (magazineLen === 1) {
    return magazine === ransomNote;
  }

  for (let i = 0; i < magazineLen / 2; i++) {
    const start = magazine[i];
    if (!tokens[start]) {
      tokens[start] = 1;
    } else {
      tokens[start]++;
    }


    const endIndex = ransomNoteLen - 1 - i;
    if (endIndex !== i) {
      const end = magazine[magazineLen - 1 - i]; 
    if (!tokens[end]) {
      tokens[end] = 1;
    } else {
      tokens[end]++;
    }
    }

  }

  // console.log(tokens);
  for (let i = 0; i < ransomNoteLen / 2; i++) {
    const start = ransomNote[i];
      
    // console.log("Start::: ", start);
    if (tokens[start]) {
      tokens[start]--;
    } else {
      return false;
    }

    const endIndex = ransomNoteLen - 1 - i;
    if (endIndex !== i) {
      const end = ransomNote[ransomNoteLen - 1 - i];
      // console.log("End::: ", end);
      if (tokens[end]) {
        tokens[end]--;
      } else {
        return false;
      }
    }
  }

  return true;
}

console.log(canConstruct("a", "b")); // false
console.log(canConstruct("aa", "ab")); // false
console.log(canConstruct("aa", "aab")); // true
console.log(canConstruct("eed", "hadjdgbhjiegafaefigffhcdgcbccgfc")); // true
