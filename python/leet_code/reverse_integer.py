'''
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example 1:
    Input: x = 123
    Output: 321

Example 2:
    Input: x = -123
    Output: -321

Example 3:
    Input: x = 120
    Output: 21
 
Constraints:
    -231 <= x <= 231 - 1
'''

class StringManipulationSolution:
    def reverse(self, x: int) -> int:

        max_32_bit_int = (2**31) - 1
        min_32_bit_int = -(2**31)

        
        sign = -1 if x < 0 else 1

        x = abs(x) # number is now positive

        # Convert number to string
        x_str = str(x)

        if len(x_str) <= 1:
            return x * sign
    
        reversed_digits = x_str[::-1]

        result = int(reversed_digits) * sign
        
        # print(f"Reversed digits: {reversed_digits}")
        if result > max_32_bit_int or result < min_32_bit_int:
            return 0
        
        return result


