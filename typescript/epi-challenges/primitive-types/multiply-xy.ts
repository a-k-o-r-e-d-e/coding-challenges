// Write a program that multiplies two nonnegative integers.
// The only operators you are allowed to use are
//     • assignment,
//     • the bitwise operators », «, |, &, “ and
//     • equality checks and Boolean combinations thereof.
// You may use loops and functions that you write yourself.
// These constraints imply, for example, that you cannot use increment or decrement, or test if x < y.
// Hint: Add using bitwise operations; multiply using shift-and-add.

// to multiply x and y we initialize the result to 0
// and iterate through the bits of x,
// adding 2ky (two raise to the power of k) to the result if the kth bit of x is 1.

// The value 2ky can be computed by left-shifting y by k. Since we cannot use add directly, we must implement it.
// We apply the grade-school algorithm for addition to the binary case, i.e., compute the sum bit-by-bit, and "rippling" the carry along.
// As an example, we show how to multiply 13 = (1101)base2 and 9 = (1001)base2 using the algorithm described above.
// In the first iteration, since the LSB of 13 is 1, we set the result to (1001)base2 The second bit of (1101)2 is 0, so we move on to the third bit.
// This bit is 1, so we shift (1001)base2 to the left by 2 to obtain (100100)base2, which we add to (1001)base2 to get (101101)base2.
// The fourth and final bit of (1101)base2 is 1,
// so we shift (1001)base2 to the left by 3 to obtain (1001000)base2, which we add to (101101)base2 to get (1110101)base2 = 117
console.log("Internal");
function multiply(x: number, y: number): number {
  let sum: number = 0;
  while (x != 0) {
    // examine each bit f x
    if ((x & 1) != 0) {
      sum = add(sum, y);
    }
    x >>>= 1;
    y <<= 1;
  }
  return sum;
}

function add(a: number, b: number): number {
  let sum = 0,
    carryIn = 0,
    k = 1,
    tempA = a,
    tempB = b;
  while (tempA != 0 || tempB != 0) {
    let ak: number = a & k,
      bk: number = b & k;
    let carryOut = (ak & bk) | (ak & carryIn) | (bk & carryIn);
    sum |= (ak ^ bk ^ carryIn);
    carryIn = carryOut << 1;
    k <<= 1;
    tempA >>>= 1;
    tempB >>>= 1;
  }
  return sum | carryIn;
}

// The time complexity of addition is 0(n),where n is the width of the operands.
// Since we do n additions to perform a single multiplication,
// the total time complexity is O(n2).

console.log("multiply 13 & 9 :::", multiply(13, 9));
