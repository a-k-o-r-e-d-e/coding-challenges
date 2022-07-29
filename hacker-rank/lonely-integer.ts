/**
 *  Given an array of integers, where all elements but one occur twice, find the unique element.
 * 
 * Example
 *      a = [1, 2,3, 4, 3, 2, 1]
 * 
 * Function Description
 * lonelyinteger has the following parameter(s):
 *      int a[n]: an array of integers
 * Returns
 *      int: the element that occurs only once
 * 
 * 
 */

function lonelyinteger(a: number[]): number {
    // Write your code here

    if (a.length === 1) {
        return a[0];
    }

    const sortedArray = a.sort((a, b) => a-b);

    for (let i = 0; i < sortedArray.length - 1; i+=2) {
        const subArr = sortedArray.slice(i+1);

        if (!subArr.includes(sortedArray[i])) {
            return sortedArray[i];
        }
    }
    
    return sortedArray[sortedArray.length -1];

}

console.log(lonelyinteger([1, 2, 3, 4, 3, 2, 1])); // 4
