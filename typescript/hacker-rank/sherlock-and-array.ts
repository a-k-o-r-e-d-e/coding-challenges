/**
 * Watson gives Sherlock an array of integers.
 * His challenge is to find an element of the array
 * such that the sum of all elements to the left is equal to the sum of all elements to the right.
 *
 * Example
 *      arr = [5, 6, 8, 11]
 * 8 is between two subarrays that sum to 11.
 * The answer is arr[2] since left and right sum to 11.
 *
 * You will be given arrays of integers and must determine whether there is an element that meets the criterion.
 * If there is, return YES. Otherwise, return NO.
 *
 * Function Description
 * Complete the balancedSums function.
 * balancedSums has the following parameter(s):
 *      int arr[n]: an array of integers
 *
 * Returns
 *      string: either YES or NO
 *
 * Constraints
 *      1 <= n <= 10^5
 *      1 <= arr[i] <= 2 * 10^4
 *      0 <= i <= n
 *
 * Sample Input
 *      arr = [1, 2, 3]
 *      returns "No"
 *
 *      arr = [1, 2, 3, 3]
 *
 * Explanation
 *      For the first test case, no such index exists.
 *      For the second test case, A[0] + A[1] = A[3], therefore index 2 satisfies the given conditions.
 *
 */

 function balancedSums(arr: number[]): string {

    let sumArr = [0];
    let sum = 0;
    for (let val of arr) {
        sum += val;
        sumArr.push(sum);
    }

    /// start from index 1 so that element always have a previous element
    for (let i = 1; i < sumArr.length; i++ ) {
        if ((sumArr[sumArr.length-1] - sumArr[i]) == sumArr[i-1]) {
            return "YES";
        }
    }

    return "NO"
}

console.log(balancedSums([1, 2, 3])) // NO
console.log(balancedSums([1, 2, 3, 3])) // YES
console.log(balancedSums([5, 6, 8, 11])) // YES
