"use strict";

/**
 * Jesse loves cookies and wants the sweetness of some cookies to be greater than value k.
 * To do this, two cookies with the least sweetness are repeatedly mixed.
 *
 * This creates a special combined cookie with:
 *  sweetness = (1 x Least sweet cookie + 2 x  2nd least sweet cookie).
 *  This occurs until all the cookies have a sweetness >= k.
 *
 * Given the sweetness of a number of cookies, determine the minimum number of operations required.
 * If it is not possible, return -1.
 *
 * Example
 *  k = 9
 *  A = [2, 7, 3, 6, 4, 6]
 *
 *  The smallest values are 2, 3.
 *  Remove them then return 2+2*3 = 8 to the array. Now A = [8, 7, 6, 4, 6].
 *  Remove 4, 6 and return 4+6*2 = 16 to the array. Now A = [16, 8, 7, 6].
 *  Remove 6,7 return 6+7*2 = 20 and A = [20, 16, 8].
 *  Finally, Remove 16, 8 and  8+16*2 = 40 and A = [40, 20]
 *  All values are >= k = 9 so the process stops after 4 iterations. Return 4.
 *
 * Function Description
 *  cookies has the following parameters:
 *      int k: the threshold value
 *      int A[n]: an array of sweetness values
 *  Returns
 *      int: the number of iterations required or -1
 */

/*
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY A
 */

/*
 *  solved this problem using two queues:
 *  In the first queues copy sorted list.
 *  In the second queue will write all calculated values (1cookie +2x 2cookie).
 *  This queue is automaticaly sorted because values increase.
 *  When extracting the value, select the minimum between two queues.
 */

function cookies(k: number, arr: number[]): number {
  let arrayIndex = 0, // // "Pointer" for arr to avoid the need to shift
    computedValuesIndex = 0, // "Pointer" for computedValues to avoid the need to shift
    opsCount = 0, // Number of operations
    computedValues: number[] = [];

  // Sort the array
  arr.sort((a, b) => a - b);

  function getMin() {
    let min;
    if (
      computedValues[computedValuesIndex] === undefined ||
      arr[arrayIndex] < computedValues[computedValuesIndex]
    ) {
      min = arr[arrayIndex];
      arrayIndex++;
    } else {
      min = computedValues[computedValuesIndex];
      computedValuesIndex++;
    }

    return min;
  }

  /// Shortcut to speed up edges
  if (arr[0] >= k) return 0;
  if (arr.length < 2) return -1;

  // Iterate while there are values in one of the arrays
  while (arr[arrayIndex] < k || computedValues[computedValuesIndex] < k) {
    const min1 = getMin();
    const min2 = getMin();
    if (min1 === undefined || min2 === undefined) return -1;

    computedValues.push(min1 + 2 * min2);
    opsCount++;
  }

  return opsCount;
}

console.log(cookies(9, [2, 7, 3, 6, 4, 6]));
// console.log(cookies(9, [2, 7]));
// console.log(cookies(9, [3, 6]));
// console.log(cookies(9, [4, 6]));
console.log("***************************");
console.log(cookies(7, [1, 2, 3, 9, 10, 12]));
// console.log(cookies(7, [1, 2, 3]));
// console.log(cookies(7, [9, 10, 12]));
