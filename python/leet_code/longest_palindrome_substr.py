'''
Given a string s, return the longest palindromic substring in s.

Example 1:
    Input: s = "babad"
    Output: "bab"
    Explanation: "aba" is also a valid answer.

Example 2:
    Input: s = "cbbd"
    Output: "bb"
 
Constraints:
    1 <= s.length <= 1000
    s consist of only digits and English letters.
'''

class BruteForceSolution:
    def longestPalindrome(self, s: str) -> str:
        str_len = len(s)
        if str_len == 1:
            return s

        for window_size in range(str_len, 0, -1):
            left, right = 0, window_size-1

            while right < str_len:
                if self.is_palindrome(s, left, right):
                    return s[left:right+1]
                
                left += 1
                right += 1

    def is_palindrome (self, s: str, left: int, right: int ) -> bool :
        if (left >= right): 
            return True
        
        if (s[left] != s[right]):
            return False

        return self.is_palindrome(s, left+1, right-1)