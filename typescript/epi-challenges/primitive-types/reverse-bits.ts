// Write a program that takes a 64-bit word and returns the 64-bit word consisting of the bits of the input word in reverse order.
// For example, if the input is alternating Is and Os, i.e., (1010...10), the outputshould be alternating Os and Is, i.e., (0101...01).

import { swapBits } from "./swap-bits";

const num = 57345;

console.log(num.toString(2));

//If we need to perform this operation just once, there is a simple bruteforce algorithm:
// iterate through the 32 least significant bits of the input, and swap each with the corresponding mostsignificant bit
function reverseBitsBruteForce(x: number): number {
  // get the length number of bits representation
  const length = x.toString(2).length;
  let i = 0;
  let j = length - 1;
  console.log("Length:: ", length);
  while (i < j) {
    console.log("Running i ::", i, " while j :: ", j);
    x = swapBits(x, i, j);
    i++;
    j--;
    console.log("Running i ::", i, " while j :: ", j);
  }

  return x;
}

console.log("Reverse Bit Brute Force::", reverseBitsBruteForce(32775));

// To implement reverse when the operation is to be performed repeatedly,
// we look more carefully at the structure of the input, with an eye towards using a cache.
// Let the input consist of the four 16-bit words yi,yi,y\,yo,with y3 holding the most significant bits.
// Then the 16 least significant bits in the reverse come from 1/3.
// To be precise, these bits appear in the reverse order in which they do in 1/3.
// For example, if Y3 is(1110000000000001), then the 16 LSBs of the result are (1000000000000111).
const precomputedReverse: number[] = [];
function reverseBits(x: number): number {
  const WORD_SIZE = 16;
  const BIt_MASK = 0xffff;
  return (
    (precomputedReverse[x & BIt_MASK] << (3 * WORD_SIZE)) |
    (precomputedReverse[(x >>> (2 * WORD_SIZE)) & BIt_MASK] <<
      (2 * WORD_SIZE)) |
    (precomputedReverse[(x >>> (2 * WORD_SIZE)) & BIt_MASK] << WORD_SIZE) |
    precomputedReverse[(x >>> (3 * WORD_SIZE)) & BIt_MASK]
  );
}
