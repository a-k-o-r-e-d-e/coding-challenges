/// Given an array of integers, where all elements but one occur twice, find the unique element.
/// Example
/// a = [1, 2,3, 4, 3, 2, 1]
// the unique element is 4

/*
 * Complete the 'lonelyinteger' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
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
