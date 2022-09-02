/**
 * You will be given a list of 32 bit unsigned integers.
 * Flip all the bits (1-> 0 and 0->1) and return the result as an unsigned integer.
 *
 * Example
 *      n = 9
 *      9 = 1001(base2). We're working with 32 bits, so:
 *      00000000000000000000000000001001(base2) = 9(base10)
 *      11111111111111111111111111110110(base2) = 4294967286(base10)
 *      Return 4294967286.
 *
 * Function Description
 * flippingBits has the following parameter(s):
 *      int n: an integer
 * Returns
 *      int: the unsigned decimal integer result
 *
 */

function flippingBits(n: number): number {
  let binaryValue = n.toString(2).padStart(32, "0");
//   console.log(nineBin);
  let flipped = "";
  for (let i = 0; i < binaryValue.length; i++) {
    flipped += Number(binaryValue[i]) ^ 1;
  }
//   console.log(flipped);
//   console.log(parseInt(flipped, 2));
return parseInt(flipped, 2);
}

console.log(flippingBits(9)); // 4294967286
console.log(flippingBits(2147483647)); // 2147483648
console.log(flippingBits(1)); // 4294967294
console.log(flippingBits(0)); // 4294967295

console.log("***Right Shift Solution*****")
function flipBitsUsingRightShift(n: number) : number {
  return ~n >>> 0;
}


console.log(flipBitsUsingRightShift(9)); // 4294967286
console.log(flipBitsUsingRightShift(2147483647)); // 2147483648
console.log(flipBitsUsingRightShift(1)); // 4294967294
console.log(flipBitsUsingRightShift(0)); // 4294967295
