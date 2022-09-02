/**
 * Given an integer , find each  such that:
 *      0 <= x <= n
 *      n+x = n(+)x
 * where (+) denotes the bitwise XOR operator.
 * Return the number of x's satisfying the criteria.
 *
 * Example
 *      n = 4
 * There are four values that meet the criteria:
 *      4 + 0 = 4 (+) 0 = 4
 *      4 + 1 = 4 (+) 1 = 5
 *      4 + 2 = 4 (+) 2 = 6
 *      4 + 3 = 4 (+) 3 = 7
 *
 * Return 4.
 *
 * Function Description
 * Complete the sumXor function.
 * sumXor has the following parameter(s):
 *      - int n: an integer
 *
 * Returns
 *      - int: the number of values found
 *
 * Constraints
 *      0 <= n <= 10^(15)
 * Subtasks
 *      0 <= n <= 100 for 60% of the maximum score
 *
 * Sample Input
 *      5
 *
 * Sample Output
 *      2
 *
 * Explanation
 *      For n = 5, the x values 0 and 2 satisfy the conditions:
 *      5 + 0 = 5, 5 (+) 0 = 5
 *      5 + 2 = 7, 5 (+) 2 = 7
 *
 * Sample Input
 *      10
 *
 * Sample Output
 *      4
 *
 * Explanation
 *      For n = 10, the x values 0, 1, 4, and 5 satisfy the conditions:
 *      10 + 0 = 10, 10 (+) 0 = 10
 *      10 + 1 = 11, 10 (+) 1 = 11
 *      10 + 4 = 14, 10 (+) 4 = 14
 *      10 + 5 = 15, 10 (+) 5 = 15
 *
 */

function sumXor(n: number): number {

    if (n == 0) {
        return 1;
    }

    const binaryForm = n.toString(2);

    if (binaryForm.lastIndexOf("1") === 0) {
        return n;
    }

    const zeros = binaryForm.split("").filter((e) => e == '0');

    return Math.pow(2, zeros.length);
}

console.log(sumXor(5)); // 2
console.log(sumXor(10)); // 4
console.log(sumXor(4)); // 4