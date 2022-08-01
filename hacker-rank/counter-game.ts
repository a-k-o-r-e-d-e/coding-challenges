/**
 * Louise and Richard have developed a numbers game.
 * They pick a number and check to see if it is a power of 2.
 * If it is, they divide it by 2.
 * If not, they reduce it by the next lower number which is a power of 2.
 * Whoever reduces the number to 1 wins the game. Louise always starts.
 *
 * Given an initial value, determine who wins the game.
 *
 * Example
 *      n = 132
 * It's Louise's turn first.
 * She determines that 132 is not a power of 2.
 * The next lower power of 2 is 128, so she subtracts that from 132 and passes 4 to Richard.
 * 4 is a power of 2, so Richard divides it by 2 and passes 2 to Louise.
 * Likewise, 2 is a power so she divides it by 2 and reaches 1. She wins the game.
 *
 * Update If they initially set counter to 1, Richard wins. Louise cannot make a move so she loses.
 *
 * Function Description
 * Complete the counterGame function.
 * counterGame has the following parameter(s):
 *      int n: the initial game counter value
 *
 * Returns
 *      string: either Richard or Louise
 *
 * Constraints
 *      1 <= n <= 2^(64) - 1
 *
 * Sample Input
 *      6
 *
 * Sample Output
 *      Richard
 *
 * Explanation
 *      As 6 is not a power of 2, Louise reduces the largest power of 2 less than 6 i.e., 4, and hence the counter reduces to 4.
 *      As 2 is a power of 2, Richard reduces the counter by half of 2 i.e., 1.
 *      Hence the counter reduces to 1.
 *      As we reach the terminating condition with N == 1, Richard wins the game.
 */

function isPowerOf2(x: number) {
  return Number.isInteger(Math.log2(x));
}

function nearestLowerPowerOf2(x: number) {
  return Math.pow(2, Math.floor(Math.log2(x)));
}

function counterGame(n: number): string {
  if (n === 1) {
    return "Richard";
  }

  if (n === 2) {
    return "Louise";
  }

  let turn: 0 | 1 = 0; // where 0 is for louise and 1 for richard

  while (!isPowerOf2(n)) {
    n -= nearestLowerPowerOf2(n);
    turn = turn === 0 ? 1 : 0;
  }

  let winningTurn: 0 | 1;

  if (Math.log2(n) % 2 !== 0) {
    winningTurn = turn;
  } else {
    winningTurn = turn === 0 ? 1 : 0;
  }

  return winningTurn === 0 ? "Louise" : "Richard";
}

console.log(counterGame(132)) // Louise
console.log(counterGame(1)) // Richard
console.log(counterGame(6)) // Richard