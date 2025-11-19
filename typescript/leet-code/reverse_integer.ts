/**
 * Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
 * 
 * Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
 * 
 * Example 1:
 *      Input: x = 123
 *      Output: 321
 * 
 * Example 2:
 *      Input: x = -123
 *      Output: -321
 * 
 * Example 3:
 *      Input: x = 120
 *      Output: 21
 * 
 * Constraints:
 *      -231 <= x <= 231 - 1
 */


function reverse_string_manipulation_solution(x: number): number {
  const max32Bit = 2 ** 31 - 1;
  const min32Bit = -(2 ** 31);

  const sign = x < 0 ? -1 : 1;

  x = Math.abs(x); // Ensure number is now positive

  const xStr = String(x); // Convert number to string

  if (xStr.length <= 1) {
    return x * sign;
  }

  const reversedStr = xStr.split("").reverse().join("");

  const result = Number(reversedStr) * sign;

  if (result > max32Bit || result < min32Bit) {
    return 0;
  }

  return result;
}
