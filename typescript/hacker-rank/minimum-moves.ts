/**
 * There are two arrays of integers, arr1 and arr2.
 * One move is defined as an increment or decrement of one element in an array.
 * Determine the minimum number of moves to match arr1 with arr2. No reordering of the digits is allowed
 *
 * Example
 *  arr1 = [123, 543]
 *  arr2 = [321, 279]
 *
 *    Match arr1[0] = 123 with arr2[0]=321
 *      - Increment 1 twice to get 3 (2 moves)
 *      - Decrement 3 twice to get 1 (2 moves)
 *      - 4 moves are needed to match 123 with 321
 *    Match arr1[1]=543 with arr2[1]=279
 *      - Decrement 5 three times to get 2 (3 moves)
 *      - Increment 4 three times to get 7 (3 moves)
 *      - Increment 3 six times to get 9 (6 moves)
 *      - 12 moves are needed to match 543 with 279
 *    16 total moves are needed to match the arrays arr1 and arr2
 *
 * Function Description
 *    minimumMoves has the following parmas
 * 
 * @param arr1 - array to modify
 * @param arr2 - array to match 
 * @returns {number} - count of moves
 */
function minimumMoves(arr1: number[], arr2: number[]): number {
  let count = 0;
  for (let i = 0; i < arr1.length; ++i) {
    let num1 = arr1[i].toString();
    let num2 = arr2[i].toString();

    for (let k = 0; k < num1.length; ++k) {
      count += Math.abs(Number(num1.charAt(k)) - Number(num2.charAt(k)));
    }
  }

  return count;
}

console.log(minimumMoves([123, 543], [321, 279])); // 16
