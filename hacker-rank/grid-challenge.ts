/*
 Given a square grid of characters in the range ascii[a-z],
 rearrange elements of each row alphabetically, ascending.
 Determine if the columns are also in ascending alphabetical order, top to bottom.
 Return YES if they are or NO if they are not.

 Example
    grid = ['abc', 'ade', 'efg']

 The grid is illustrated below.
    a b c
    a d e
    e f g

 The rows are already in alphabetical order. 
 The columns a a e, b d f and c e g are also in alphabetical order, so the answer would be YES. 
 Only elements within the same row can be rearranged.
 They cannot be moved to a different row.
*/

/*
 * Complete the 'gridChallenge' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function gridChallenge(grid: string[]): string {
  for (let i = 0; i < grid.length; i++) {
    grid[i] = sortAlphabet(grid[i]);
  }

  if (grid.length === 1) return "YES";

  /// run through the grid, column by column
  for (let colIndex = 0; colIndex < grid[0].length; colIndex++) {
    for (let rowIndex = 1; rowIndex < grid.length; rowIndex++) {
      /// check if the current row member is less than the row member preceding it.
      /// if so return false
      if (
        grid[rowIndex][colIndex].localeCompare(grid[rowIndex - 1][colIndex]) ===
        -1
      ) {
        return "NO";
      }
    }
  }

  /// If we got to this point, the columns are in acending order
  return "YES";
}

function sortAlphabet(str: string) {
  return [...str].sort().join("");
}

console.log(gridChallenge(["abc", "ade", "efg"])); // YES
console.log(gridChallenge(["ebacd", "fghij", "olmkn", "trpqs", "xywuv"])); // YES
console.log(gridChallenge(["abc", "lmp", "qrt"])); // YES
console.log(gridChallenge(["mpxz", "abcd", "wlmf"])); // NO

console.log(gridChallenge(["abc", "hjk", "mpq", "rtv"])); // YES
