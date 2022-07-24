"use strict";

/*
  Given a string of numbers in the range ascii[a-z],
  determine the index of a character that can be removed to make the string a palidrome

  There may be more than one solution, but any will do.
  If the word is already a palidrome or there is no solution, return -1.
  Otherwise, return the index of a character to remove

  Example
  s = "bcbc"

  Either removes 'b' at index 0 or 'c' at index 3
*/

function isPalindrome(str: string) {
  if (str.length == 1) {
    return 1;
  }

  var re = /[^A-Za-z0-9]/g;
  str = str.toLowerCase().replace(re, "");
  var len = str.length;
  for (var i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

function palindromeIndex(s: string): number {
  if (isPalindrome(s)) {
    return -1;
  }

  var len = s.length;
  for (var i = 0; i < len / 2; i++) {
    if (s[i] !== s[len - 1 - i]) {
      let startIndex = i,
        endIndex = len - 1 - i;
      if (isPalindrome(s.slice(startIndex, endIndex))) {
        return endIndex;
      } else if (isPalindrome(s.slice(startIndex + 1, endIndex + 1))) {
        return startIndex;
      }
    }
  }

  return -1;
}

console.log(palindromeIndex("aaab")); // 3
console.log(palindromeIndex("baa")); // 0
console.log(palindromeIndex("aaa")); // -1
