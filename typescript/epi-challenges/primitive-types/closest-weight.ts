// Define the weight of a nonnegative integer x to be the number of bits that are set to 1 in its binary representation.
// For example, since 92 in base-2 equals (1011100)2, the weight of 92 is 4.
// Write a program which takes as input a nonnegative integer x 
// and returns a number y which is not equal to x,
// but has the same weight as x and their difference,|y - x|, is as small as possible.
// You can assume x is not 0, or all Is. For example, if x = 6, you should return 5.

/// Solution
// A little math leads to the correct approach. 
// Suppose we flip the bit at index k1 and flip the bit at index k2, kl > k2. 
// Then the absolute value of the difference between the original integer and the new one is 2kl - 2kl.
// To minimize this, we should make kl as small as possible and k2 as close to kl.
// Since we must preserve the weight, the bit at index kl has to be different from the bit in k2,
// otherwise the flips lead to an integer with different weight.
// This means the smallest kl can be is the rightmost bit that's different from the LSB, and k2 must be the very next bit. 
// In summary, the correct approach is to swap the two rightmost consecutive bits that differ.

const NUM_UNSIGNED_BITS = 63;

function closestIntSameBitCount (x: number): number {
    // x is assumed to be non-negative so we know the leading bit is 0. 
    // We restrict our attention to 63 LSBs
    for (let i =0; i<NUM_UNSIGNED_BITS-1; ++i) {
        if (((x>>>1) & 1) != ((x>>>(i+1)&1))) {
            x ^= (1 << i) | (1 << (i+1)); // swap bit-i and bit-(i+1)
            return x;
        }
    }

    // Throw error if all the bits of x are 0 or 1
    throw new Error("All bits are 0 or 1");
}