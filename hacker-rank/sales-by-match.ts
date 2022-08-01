/**
 * There is a large pile of socks that must be paired by color. 
 * Given an array of integers representing the color of each sock, 
 * determine how many pairs of socks with matching colors there are.
 * 
 * Example
 *      n = 7
 *      arr = [1, 2, 1, 2, 1, 3, 2]
 * 
 *  There is one pair of color 1 and one of color 2. 
 *  There are three odd socks left, one of each color. 
 *  The number of pairs is 2.
 * 
 * Function Description
 * Complete the sockMerchant function.
 * sockMerchant has the following parameter(s):
 *      int n: the number of socks in the pile
 *      int ar[n]: the colors of each sock
 * 
 * Returns
 *      int: the number of pairs
 * 
 * Constraints
 *      1 <= n <= 100
 *      1 <= arr[i] <= 100 where 0<=i<n
 */

 function sockMerchant(n: number, ar: number[]): number {

    if (ar.length === 1) {
        return 0;
    }

    if (ar.length === 2) {
        if (ar[0] === ar[1]) {
            return 1;
        }
        return 0;
    }

    ar = ar.sort((a,b) => a-b);
    let matchCount = 0;

    while (ar.length > 1) {
        // we are effectively iterating from the back
        // if the last two elements are equal. pop both
        // else pop only the last element
        if (ar[ar.length-1] === ar[ar.length-2]) {
            matchCount++;
            ar.pop();
            ar.pop();
        } else {
            ar.pop();
        }
    }

    return matchCount;
}

console.log(sockMerchant(7, [1, 2, 1, 2, 1, 3, 2])); // 2
console.log(sockMerchant(9, [10, 20, 20, 10, 10, 30, 50, 10, 20])); // 3