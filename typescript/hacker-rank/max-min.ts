/**
 * You will be given a list of integers, arr, and a single integer k. 
 * You must create an array of length k from elements of arr such that its unfairness is minimized. 
 * Call that array arr'. Unfairness of an array is calculated as
 *      max(arr') - min(arr')
 * Where:
 *      - max denotes the largest integer in arr'
 *      - min denotes the smallest integer in arr'
 * 
 * Example
 *      arr = [1, 4, 7, 2]
 *      k = 2
 *  Pick any two elements, say arr' = [4, 7].
 *  unfairness = max(4, 7) - min(4, 7) = 7-4 = 3
 *  Testing all pairs the solution [1,2] provides the minimum unfairness.
 * 
 * Note: Integers in arr may not be unique.
 * 
 * Function Description
 * Complete the maxMin function
 * maxMin has the following parameter(s):
 *      int k: the number of elements to select
 *      int arr[n]:: an array of integers
 * 
 * Returns
 *      int: the minimum possible unfairness
 * 
 * Constraints
 *  2 <= n <= 10^5
 *  2 <= k <= n
 *  0 <= arr[i] <= 10^9
 * 
 * Sample Input
 *      k = 4
 *      arr = [1, 2, 3, 4, 10, 20, 30, 40, 100, 200]
 * 
 * Sample Output
 *      3
 * 
 * Explanation
 *  Here k=4; selecting the 4 integers 1,2,3, 4, unfairness equals
 *      max(1,2,3,4) - min(1,2,3,4) = 4 - 1 = 3
 */


 function maxMin(k: number, arr: number[]): number {
    arr = arr.sort((a, b) => a-b);

    let minUnfairness = Number.POSITIVE_INFINITY;

    for (let i = k-1; i < arr.length; i++) {
        // console.log("Indexes:: ", i, i-(k-1))
        const currUnfairness = arr[i] - arr[i-(k-1)];
        minUnfairness = Math.min(currUnfairness, minUnfairness);
    }

    return minUnfairness;
 }

 console.log(maxMin(2, [1, 4, 7, 2])); // 1
 console.log(maxMin(4, [1, 2, 3, 4, 10, 20, 30, 40, 100, 200])); // 3