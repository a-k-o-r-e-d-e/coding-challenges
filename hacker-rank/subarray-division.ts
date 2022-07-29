/**
 * Two children, Lily and Ron, want to share a chocolate bar. 
 * Each of the squares has an integer on it.
 * Lily decides to share a contiguous segment of the bar selected such that:
 *      The length of the segment matches Ron's birth month, and,
 *      The sum of the integers on the squares is equal to his birth day.
 *      Determine how many ways she can divide the chocolate.
 * 
 * Example
 *      s = [2, 2, 1, 3, 2]
 *      d = 4
 *      m = 2
 *  Lily wants to find segments summing to Ron's birth day, d = 4 with a length equalling his birth month, m = 2. 
 *  In this case, there are two segments meeting her criteria: [2, 2] and [1, 3].
 * 
 * Function Description
 * Complete the birthday function.
 * birthday has the following parameter(s):
 *      int s[n]: the numbers on each of the squares of chocolate
 *      int d: Ron's birth day
 *      int m: Ron's birth month
 * 
 * Returns
 *      int: the number of ways the bar can be divided
 * 
 * Constraints
 *      1 <= n <= 100
 *      1 <= s[i] <= 5, where (0<=i<n)
 *      1 <= d <= 31
 *      1 <= m <= 12
 */


 function birthdayBruteForce(s: number[], d: number, m: number): number {
    let sum = 0;
    let sumArr: number[] = [0];

    /// compute and store the sum of 0...i in the (i+1)th element of sumArr
    for (let val of s) {
        sum+= val;
        sumArr.push(sum);
    }
    // console.log(sumArr)
    let subArrCount = 0;

    
    for (let i = m; i < sumArr.length; i++) {
        /// (sumArr[i] - sumArr[i-m]) gives us the sum of the segment with length m 
        if (sumArr[i] - sumArr[i-m] == d) {
            // console.log(sumArr[i], sumArr[i-m])
            subArrCount+= 1;
        }
    }

    // [2, 2, 1, 3, 2]
    //  0  1  2  3  4   5
    // [0, 2, 4, 5, 8, 10]

    return subArrCount;
}

console.log(birthdayBruteForce([2, 2, 1, 3, 2], 4, 2)); // 2
console.log(birthdayBruteForce([1, 1, 1, 1, 1], 3, 2)); // 2
console.log(birthdayBruteForce([4], 4, 1)); // 2