/**
 * There are two -element arrays of integers, A and B.
 * Permute them into some A' and B' such that the relation
 *      A'[i] + B'[i] >= k holds for all i where 0 <= i < n.
 *
 * There will be q queries consisting of A, B, and k.
 * For each query, return YES if some permutation A', B' satisfying the relation exists.
 * Otherwise, return NO.
 *
 * Example
 *      A = [0, 1]
 *      B = [0, 2]
 *      k = 1
 *
 *  A valid A', B' is A' = [1, 0] and B' = [0, 2]: 1 + 0 >= 1 and 0 + 2 >= 1.
 * Return YES.
 *
 * Function Description
 * twoArrays has the following parameter(s):
 *      int k: an integer
 *      int A[n]: an array of integers
 *      int B[n]: an array of integers
 * Returns
 *      - string: either YES or NO
 *
 * Constraints
 *      1 <= q <= 10
 *      1 <= n <= 1000
 *      1 <= k <= 10^9
 *      0 <= A[i], B[i] <= 10^9
 */

function twoArrays(k: number, A: number[], B: number[]): string {
  if (A.length === 1) {
    return A[0] + B[0] >= k ? "YES" : "NO";
  }

  A.sort((a, b) => a-b);
  B.sort((a, b) => a-b);

  const arrSize = B.length;

  for (let i = 0; i < A.length; i++) {
    if (A[i] + B[arrSize -i - 1] < k) {
        return "NO";
    }
  }

  return "YES";
}

console.log(twoArrays(1, [0, 1], [0, 2])); // YES
console.log(twoArrays(10, [2, 1, 3], [7, 8, 9])); // YES
console.log(twoArrays(5, [1, 2, 2, 1], [3, 3, 3, 4]));
