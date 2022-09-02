// COMPUTING THE PARITY OF A WORD

function parityBruteForce(x: number): number {
  var result: number = 0;

  while (x != 0) {
    result ^= x & 1;
    x >>>= 1;
  }

  return result;
}

console.log("Brute Force Result:: ", parityBruteForce(9007199254740991));

/// Note " x &= (x-1);" erase the lowest set bit in a word in a single operation
/// This can be used to improve performance in the best- and average-cases.
function parityFirstIteration(x: number): number {
  var result: number = 0;
  while (x != 0) {
    result ^= x & 1;
    x &= x - 1; /// drops the lowest set bit of x
  }
  return result;
}

console.log("First Iteration Result:: ", parityFirstIteration(9007199254740991));

// How would you compute the parity of a very large number of 64-bit words?
// When you have to perform a large number of parity computations,
// and,more generally, any kind of bit fiddling computations,
// two keys to performance are processing multiple bits at a time and caching results in an array-based lookup table.
// First we demonstrate caching. Clearly, we cannot cache the parity of every 64-bit integer—we would need 264 bits of storage
// which is of the order of ten trillion ex¬abytes.
// We choose 16 since 216 = 65536 isrelatively small
// which makes it feasible to cache the parity of all 16-bit words using an array.
// Furthermore, since 16 evenly divides 64, the code is simpler than if we were, for example, to use 10 bit subwords
var precomputedParity: number[] = [];
function parity64BitsWithCaching(x: number): number {
  const WORD_SIZE: number = 16;
  const BIt_MASK: number = 0xffff;
  return (precomputedParity[((x >>> (3 * WORD_SIZE)) & BIt_MASK) as number] ^
    precomputedParity[((x >>> (2 * WORD_SIZE)) & BIt_MASK) as number] ^
    precomputedParity[((x >>> WORD_SIZE) & BIt_MASK) as number] ^
    precomputedParity[(x & BIt_MASK) as number]) as number;
}

console.log("Parity 64 Bits with caching:: ", parity64BitsWithCaching(9007199254740991));
console.log(Number.MAX_SAFE_INTEGER);

// Note :: . XOR has the property of being associative (as previously described), as well as commutative
// The XOR of a group of bitsisits parity. We can exploit thisfact to use the CPU's word-level XOR instruction to process multiple bits at a time
function parityWithJustXOR (x: bigint) {
    // x ^= x>>>32; 
    // x ^= x>>> BigInt(16);
    // x = BigInt(Math.floor(Number(x/BigInt(2*32))));
    // x ^= x>>>8;
    // x ^= x>>>4;
    // x ^= x>>>2;
    // x ^= x>>>1;

    // return (x & 0x1);
    return x;
}

console.log("Parity using just XOR::: ", parityWithJustXOR(9007199254740998n));