// A 64-bit integer can be viewed as an array of 64 bits,
// with the bit at index 0 corresponding to the least significant bit (LSB),
// and the bit at index 63 corresponding to the most significant bit (MSB).
// Implement code that takes as input a 64-bit integer and swaps the bits at indices i and y

export function swapBits(x: number, i: number, j: number) {
  // Extract the i-th and j-th bits and see if they differ
  if (((x >>> i) & 1) != ((x >>> j) & 1)) {
    // i-th and j-th bits differ. We will swap them by flipping their values
    // select the bits to flip with bitmask.
    // since x^1=0 when x=1 and 1 when x-0. we can perform the flip with XOR
    var bitmask: bigint = BigInt((1 << i) | (1 << j));
    console.log("Bitmask:::", bitmask);
    let temp = BigInt(x);
    temp ^= bitmask;
    console.log("Temp:: ", temp);
    x = Number(temp);
  }
  return x;
}

// console.log("Swap bits::: ", swapBits(284, 5, 4));