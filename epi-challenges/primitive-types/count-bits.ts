// Write a program to count the number of bits that are set to 1 in an integer

//The following program tests bits one-at-a-time starting with the least-significant bit.
// It illustrates shifting and masking

function countBits(x: number): number {
  var numBits: number = 0;
  while (x != 0) {
    numBits += x & 1;
    x >>>= 1;
  }
  return numBits;
}

console.log(countBits(8));
