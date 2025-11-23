/**
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this:
 * (you may want to display this pattern in a fixed font for better legibility)
 *      P   A   H   N
 *      A P L S I I G
 *      Y   I   R
 * And then read line by line: "PAHNAPLSIIGYIR"
 *
 * Write the code that will take a string and make this conversion given a number of rows:
 * string convert(string s, int numRows);
 *
 * Example 1:
 * Input: s = "PAYPALISHIRING", numRows = 3
 * Output: "PAHNAPLSIIGYIR"
 *
 * Example 2:
 * Input: s = "PAYPALISHIRING", numRows = 4
 * Output: "PINALSIGYAHRPI"
 * Explanation:
 *      P     I    N
 *      A   L S  I G
 *      Y A   H R
 *      P     I
 *
 *
 * Example 3:
 * Input: s = "A", numRows = 1
 * Output: "A"
 *
 *
 * Constraints:
 * 1 <= s.length <= 1000
 * s consists of English letters (lower-case and upper-case), ',' and '.'.
 * 1 <= numRows <= 1000
 */

function convert_zigzag_bruteforce(s: string, numRows: number): string {
    if (numRows == 1 || numRows >= s.length) {
      return s;
    }

  const numDiagonals = numRows - 2;
  let output = "";

  let idx = 0;
  let matrix: string[][] = [];
  while (idx < s.length) {
    let fulCol = [];
    for (let x = 0; x < numRows; x++) {
      fulCol.push(s[idx]);
      idx += 1;
    }
    matrix.push(fulCol);

    for (let d = 0; d < numDiagonals; d++) {
      let diaCol = Array(numRows).fill("");
      let diaIdx = numRows - d - 2;
      diaCol[diaIdx] = s[idx];
      idx += 1;
      matrix.push(diaCol);
    }
  }

  // Tranverse the matrix
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < matrix.length; c++) {
      let cell = matrix[c][r];
      if (cell && cell.length != 0) {
        output += cell;
      }
    }
  }
  return output;
}

/**
 * All we have to do is that we just move up and down.
 * More precisely, if we reach numsRows - 1, we move up next time and if we reach the first row, we move down next time.
 *
 * We will create a direction variable to handle moving direction.
 * When we move down, the variable has 1. On the other hand, when we move up, the variable has -1.
 */
function convert_zigzag_diagonal_solution(s: string, numRows: number): string {
  if (numRows == 1 || numRows >= s.length) {
    return s;
  }

  let idx = 0;
  let d = 1; // direction
  let rows: any = Array.from({ length: numRows }, () => []);

  // console.log("Rows Before: ", rows)

  for (let char of s) {
    // console.log("Idx:: ", idx, "--Char: ", char)
    rows[idx].push(char);
    if (idx === 0) {
      d = 1;
    } else if (idx === numRows - 1) {
      d = -1;
    }

    idx += d;
  }

  // console.log("Rows: ", rows);

  for (let i = 0; i < numRows; i++) {
    rows[i] = rows[i].join("");
  }

  return rows.join("");
}
