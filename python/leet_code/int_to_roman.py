"""
Seven different symbols represent Roman numerals with the following values:

Symbol	Value
I	1
V	5
X	10
L	50
C	100
D	500
M	1000
Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:

If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.
If the value starts with 4 or 9 use the subtractive form representing one symbol subtracted from the following symbol, for example, 4 is 1 (I) less than 5 (V): IV and 9 is 1 (I) less than 10 (X): IX. Only the following subtractive forms are used: 4 (IV), 9 (IX), 40 (XL), 90 (XC), 400 (CD) and 900 (CM).
Only powers of 10 (I, X, C, M) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5 (V), 50 (L), or 500 (D) multiple times. If you need to append a symbol 4 times use the subtractive form.
Given an integer, convert it to a Roman numeral.

 

Example 1:

Input: num = 3749

Output: "MMMDCCXLIX"

Explanation:

3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC as 500 (D) + 100 (C) + 100 (C)
  40 = XL as 10 (X) less of 50 (L)
   9 = IX as 1 (I) less of 10 (X)
Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places
Example 2:

Input: num = 58

Output: "LVIII"

Explanation:

50 = L
 8 = VIII
Example 3:

Input: num = 1994

Output: "MCMXCIV"

Explanation:

1000 = M
 900 = CM
  90 = XC
   4 = IV
 

Constraints:

1 <= num <= 3999
"""

class RecursiveSolution:
    def computeSubtractiveForm(self, first_digit: int, num_len: int) :
        match (first_digit, num_len):
            case (4, 1):
                return ("IV", 4)
            case (9, 1):
                return ("IX", 9)
            case (4, 2):
                return ("XL", 40)
            case (9, 2):
                return ("XC", 90)
            case (4, 3):
                return ("CD", 400)
            case (9, 3):
                return ("CM", 900)
            

    def computeSymbol(self, num: int) : 
        if num >= 1000:
            return ("M", 1000)
        if num >= 500:
            return ("D", 500)
        if num >= 100:
            return ("C", 100)
        if num >= 50:
            return ("L", 50)
        if num >= 10:
            return ("X", 10)
        if num >= 5:
            return ("V", 5)
        return ("I", 1)

    def intToRoman(self, num: int) -> str:
        if num < 1:
            return ""
        # Separate the first digit in the number
        num_str = str(num)

        # if first digit is not equal to 4 or 9
        first_digit = num_str[0]

        if first_digit not in ['9', '4']:
            # do this by comparing the symbol values that the number is greater than. 

        # Pick the largest number possible. 
        # append the symbol to the result, 
        # subtract its value and convert the remainder to a roman numeral. 
            (symbol, value) = self.computeSymbol(num)
            return symbol + self.intToRoman(num-value)

        else:
            # Use the value of the first digit and length of the number to select a corresponding subtractive form. 
            # append the symbol to the result
        # subtract its value and convert the remainder to a roman numeral.
            (symbol, value) = self.computeSubtractiveForm(int(first_digit), len(num_str))
            return symbol + self.intToRoman(num-value)

class IterativeSolution:
    def intToRoman(self, num: int) -> str:
        #use insert to the first item or string = item + string
        #for i, n in enumerate(str(num)):
        out = ''
        while num>=1000: 
            out += 'M'
            num = num-1000
        while num>=900: 
            out+= 'CM'
            num = num-900
        while num>=500: 
            out +='D'
            num = num-500
        while num>=400: 
            out += 'CD'
            num = num-400
        while num>=100: 
            out += 'C'
            num = num-100
        while num >=90: 
            out += 'XC'
            num = num - 90
        while num>=50: 
            out += 'L'
            num = num-50
        while num>=40: 
            out += 'XL'
            num = num-40
        while num>=10: 
            out += 'X'
            num = num-10
        while num>=9: 
            out += 'IX'
            num = num - 9
        while num >= 5: 
            out += 'V'
            num = num-5
        while num >= 4: 
            out += 'IV'
            num = num-4
        while num >= 1: 
            out += 'I'
            num += -1
        return out