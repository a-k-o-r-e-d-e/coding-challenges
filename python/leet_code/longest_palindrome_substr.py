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
    

class ExpandFromCenterSolution:
    def longestPalindrome(self, s: str) -> str:
        if len(s) <= 1:
            return s
        
        max_str = s[0]

        for i in range(len(s) -1):
            odd = self.expand_from_center(s, i, i)
            even = self.expand_from_center(s, i, i+1)

            if len(odd) > len(max_str):
                max_str = odd
            if len(even) > len(max_str):
                max_str = even

        return max_str
    
    def expand_from_center(self, s:str, left: int, right: int)-> str:
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right +=1
        return s[left +1: right]