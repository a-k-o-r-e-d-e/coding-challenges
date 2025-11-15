'''
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

    P   A   H   N
    A P L S I I G
    Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:
string convert(string s, int numRows);
 
Example 1:
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"

Example 2:
Input: s = "PAYPALISHIRING", numRows = 4
Output: "PINALSIGYAHRPI"
Explanation:
    P     I    N
    A   L S  I G
    Y A   H R
    P     I

Example 3:
Input: s = "A", numRows = 1
Output: "A"
 
Constraints:
    1 <= s.length <= 1000
    s consists of English letters (lower-case and upper-case), ',' and '.'.
    1 <= numRows <= 1000
'''
class BruteForceSolution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1 or numRows >= len(s):
            return s
        
        num_diagonals = numRows-2
        output = []
        matrix = []

        idx = 0
        while idx < len(s):
            fulCol = []
            for x in range(numRows):
                fulCol.append(s[idx] if idx < len(s) else '')
                idx +=1
            
            matrix.append(fulCol)

            for d in range(num_diagonals):
                diaCol = ['' for _ in range(numRows)]
                diaIdx = numRows - d -2
                diaCol[diaIdx] = s[idx] if idx < len(s) else ''
                idx += 1
                matrix.append(diaCol)
        

        # Tranverse the matrix
        for r in range(numRows):
            for c in range(len(matrix)):
                cell = matrix[c][r]
                output.append(cell)

        return ''.join(output)
